import { useEffect, useState } from "react";
import axios from "axios";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DataNotesStudent = () => {
    const [notesData, setNotesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make the API call to fetch notes for the specific student
                const response = await axios.get(`http://localhost:3000/note/`);
                setNotesData(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchData(); // Call the function to fetch data

    }, []);

    return (
        <div>

            <TableContainer component={Paper} className="table">
                <Table aria-label="student notes table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Note ID</TableCell>
                            <TableCell>Note</TableCell>
                            <TableCell>Academic Year</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Maximum Score</TableCell>
                            <TableCell>Element Code</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notesData.slice(0, 10).map((note, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{note.note}</TableCell>
                                <TableCell>{note.AnneeUniversitaire}</TableCell>
                                <TableCell>{note.Status}</TableCell>
                                <TableCell>{note.bareme}</TableCell>
                                <TableCell>{note.elementModuleCode}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DataNotesStudent;
