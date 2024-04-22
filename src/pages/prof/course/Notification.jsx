import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Sidebar from "../sidebar1/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import dayjs from 'dayjs';
import ModuleDropdown from "../dashboard/chart/DropDown";
import { Editor } from 'primereact/editor';
import axios from 'axios';
import "./FileUploader.scss";

const Courses = () => {
  const [value, setValue] = useState(dayjs());
  const [selectedModule, setSelectedModule] = useState(null);
  const [text, setText] = useState('');
  const [datedebut, setDatedebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [file, setFile] = useState(null);
  const [devoirs, setDevoirs] = useState([]);

  const handleModuleSelect = (elementModuleCode, elementModuleId) => {
    setSelectedModule({ code: elementModuleCode, id: elementModuleId });
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]; // Récupère le fichier sélectionné
    setFile(selectedFile); // Met à jour l'état avec le fichier sélectionné
  };

  const handleCreateDevoir = () => {
    const fileName = file ? file.name : null;

    const newDevoirData = {
      titre: text,
      datedebut,
      dateFin,
      file: fileName,
      elementModuleId: selectedModule.id
    };

    axios.post('http://localhost:3000/devoir', newDevoirData)
      .then(response => {
        console.log('Devoir créé avec succès !', response.data);
        setText('');
        setFile(null);
        setDatedebut(null);
        setDateFin(null);
        setDevoirs([...devoirs, response.data]); 
        console.log("devoirs",devoirs)// Ajoute le nouveau devoir à la liste
      })
      .catch(error => {
        console.error('Erreur lors de la création du devoir :', error);
      });
  };

  const handleDeleteDevoir = (devoirId) => {
    axios.delete(`http://localhost:3000/devoir/${devoirId}`)
      .then(response => {
        console.log('Devoir supprimé avec succès !');
        setDevoirs(devoirs.filter(devoir => devoir.id !== devoirId)); // Supprime le devoir de la liste
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du devoir :', error);
      });
  };

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="widgets">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date Debut"
              defaultValue={dayjs()}
              onChange={(newValue) => setDatedebut(newValue)}
            />
            <DateTimePicker
              label="Date Fin"
              value={value}
              onChange={(newValue) => setDateFin(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="widgets">
          <ModuleDropdown onSelect={handleModuleSelect} value={selectedModule} style={{ padding: "0px", margin: "20px", display: "flex" }}/>
        </div>
        <div className="listTitle">Description</div>
        <Editor style={{height:'50px'}} value={text} onTextChange={(e) => setText(e.htmlValue)} />
        {/* Ajoutez l'élément input pour choisir le fichier */}
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleCreateDevoir}>Ajouter Devoir</button>
        {/* Affichage des devoirs ajoutés */}
        
      </div>
    </div>
  );
}

export default Courses;
