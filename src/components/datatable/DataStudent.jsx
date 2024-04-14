import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
const DataStudent = () => {
    const [file, setFile] = useState(null);
    const [filiere, setFiliere] = useState('');
    const [studentData, setStudentData] = useState([]);
    const [fields, setFields] = useState([]);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get('http://localhost:3000/filiere/');
                setFields(response.data); // Assuming the response contains an array of field objects
            } catch (error) {
                console.error('Error fetching fields:', error);
            }
        };

        fetchFields();
    }, []);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        // Read Excel file
        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Assuming the first row contains headers
            const headers = parsedData[0];
            // Assuming each subsequent row contains student data
            const students = parsedData.slice(1).map((row) => ({
                nom: row[0], // Assuming nom is in the first column
                prenom: row[1], // Assuming prenom is in the second column
                dateNaissance: row[2], // Assuming dateNaissance is in the third column
                CIN: row[3], // Assuming CIN is in the fourth column
                CNE: row[4], // Assuming CNE is in the fifth column
                email: row[5], // Assuming email is in the sixth column
                motDePasse: row[6], // Assuming motDePasse is in the seventh column
                photo: row[7], // Assuming photo is in the eighth column
            }));

            setStudentData(students);
        };
        reader.readAsArrayBuffer(uploadedFile);
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to backend endpoint
            const response = await axios.post('http://localhost:3000/etudiant/', {
                filiereId: filiere,
                students: studentData,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating students:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={handleFileChange} />
            <select value={filiere} onChange={(e) => setFiliere(e.target.value)}>
                {fields.map((field) => (
                    <option key={field.id} value={field.id}>{field.nom}</option>
                ))}
            </select>
            <button type="submit">Upload</button>
        </form>
    );
};

export default DataStudent;
