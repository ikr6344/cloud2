import React, { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../sidebarstd/Sidebar';


const List = () => {
  const [row, setRow] = useState(null); // Attendez un seul objet, pas un tableau

  useEffect(() => {
    // Remplacez ceci par vos appels d'API réels
    Promise.all([
      fetch('http://localhost:3000/note/etudiants/7I62782111/note').then(response => response.json()),
      fetch('http://localhost:3000/elementModule').then(response => response.json()),
      fetch('http://localhost:3000/module').then(response => response.json())
    ]).then(([noteData, elementModuleData, moduleData]) => {
      if (noteData && typeof noteData === 'object') { // Vérifiez que c'est un objet
        const matchedElementModule = elementModuleData.find(elementModule => elementModule.code === noteData.elementModuleCode);
        const matchedModule = moduleData.find(module => module.id === matchedElementModule?.moduleId?._path?.segments[1]);
        
        const newRow = {
          ...noteData,
          nomElementModule: matchedElementModule?.nom,
          pourcentage: matchedElementModule?.pourcentage,
          nomModule: matchedModule?.nom,
        };

        setRow(newRow); // Utilisez un seul objet
      } else {
        console.error("Donnée inattendue reçue pour la note");
      }
    }).catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }, []);

  if (!row) {
    return <div>Chargement...</div>; // Gestion de l'état de chargement
  }

  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <div className="listContainer">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="table des notes">
        <TableHead>
          <TableRow>
            <TableCell>Nom de l'Élément du Module</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Nom du Module</TableCell>
            <TableCell>Bareme</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={row.etudiantCNE}>
            <TableCell>{row.nomElementModule}</TableCell>
            <TableCell>{row.note}</TableCell>
            <TableCell>{row.Status}</TableCell>
            <TableCell>{row.nomModule}</TableCell>
            <TableCell>{row.bareme}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </div>
  );
};

export default List;
