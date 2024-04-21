import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Sidebar from "../sidebar1/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import dayjs from 'dayjs';
import ModuleDropdown from "../dashboard/chart/DropDown";
import { Editor } from 'primereact/editor';
import FileUploader from './FileUploader'; // Importez votre composant FileUploader ici
import axios from 'axios'; // Importez axios pour effectuer des requêtes HTTP
import "../profile/Profile.scss"
const Courses = () => {
  const [value, setValue] = useState(dayjs()); // Utilisez dayjs() sans argument pour obtenir la date actuelle
  const [selectedModule, setSelectedModule] = useState(null);
  const [text, setText] = useState(''); // Ajoutez text à l'état du composant
  const [file, setFile] = useState(null); // Ajoutez file à l'état du composant
  const [datedebut, setDatedebut] = useState(null); // Ajoutez datedebut à l'état du composant
  const [dateFin, setDateFin] = useState(null); // Ajoutez dateFin à l'état du composant

  const handleModuleSelect = (elementModuleCode, elementModuleId) => {
    setSelectedModule({ code: elementModuleCode, id: elementModuleId });
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.files[0];
    console.log("file",selectedFile) // Récupérer le premier fichier sélectionné
    setFile(selectedFile); // Mettre à jour l'état file avec le fichier sélectionné
  };
  
  
  const handleCreateDevoir = () => {
    const fileName = file ? file.name : null;

    // Créez un objet avec les données à envoyer à l'API
    const newDevoirData = {
      titre: text,
      datedebut,
      dateFin,
      file: fileName,
      elementModuleId: selectedModule.id
    };

    // Envoyez les données à votre API
    axios.post('http://localhost:3000/devoir', newDevoirData)
      .then(response => {
        console.log('Devoir créé avec succès !', response.data);
        // Réinitialisez les champs du formulaire après la création du devoir si nécessaire
        setText('');
        setFile(null);
        setDatedebut(null);
        setDateFin(null);
      })
      .catch(error => {
        console.error('Erreur lors de la création du devoir :', error);
      });
  };

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="widgets">

        <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Uncontrolled picker"
            defaultValue={dayjs()}
            onChange={(newValue) => setDatedebut(newValue)}
          />
          <DateTimePicker
            label="Controlled picker"
            value={value}
            onChange={(newValue) => setDateFin(newValue)}
          />
        </LocalizationProvider>
        </div>
        <div className="widgets">

        <ModuleDropdown onSelect={handleModuleSelect} value={selectedModule} style={{ padding: "0px", margin: "20px", display: "flex" }}/>
        <FileUploader onFileSelect={handleFileSelect} value={file}  />
</div>
        <div className="listTitle">Description</div>
        <Editor style={{height:'50px'}} value={text} onTextChange={(e) => setText(e.htmlValue)} />
        <button onClick={handleCreateDevoir}>Edit</button>
      </div>
    </div>
  )
}

export default Courses;
