import React, { useState, useEffect } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

const EtudiantsList = ({ elementModuleId }) => {
  const [etudiants, setEtudiants] = useState([]);
  const [elementModuleCode, setElementModuleCode] = useState("");
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/etudiant/elementmodule/${elementModuleId}`);
        const elementModuleIdFromUrl = response.config.url.split('/').pop();
        setEtudiants(response.data);
        setElementModuleCode(elementModuleIdFromUrl);
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants :", error);
      }
    };

    fetchEtudiants();
  }, [elementModuleId]);

  const getElementModuleCode = async (elementModuleId) => {
    try {
      const response = await axios.get(`http://localhost:3000/elementModule/${elementModuleId}`);
      return response.data.code;
    } catch (error) {
      console.error("Erreur lors de la récupération du code de l'élément de module :", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const newNotes = {};
      for (const etudiant of etudiants) {
        const note = await getNoteByCNEAndElementModule(etudiant.CNE, elementModuleId);
        newNotes[etudiant.CNE] = note !== null ? note : "N/A";
      }
      setNotes(newNotes);
    };

    fetchNotes();
  }, [etudiants, elementModuleId]);

  const getNoteByCNEAndElementModule = async (cne, elementModuleId) => {
    const elementModuleCode = await getElementModuleCode(elementModuleId);

    if (!elementModuleCode) {
      console.error("Le code de l'élément de module n'a pas été trouvé.");
      return null;
    }

    try {
      const response = await axios.get(`http://localhost:3000/note/etudiants/${cne}/elementmodule/${elementModuleCode}/note`);
      return response.data.note;
    } catch (error) {
      console.error("Erreur lors de la récupération de la note de l'étudiant :", error);
      return null;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>CNE</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Note</TableCell> {/* Nouvelle colonne pour afficher la note */}
          </TableRow>
        </TableHead>
        <TableBody>
          {etudiants.map((etudiant) => (
            <TableRow key={etudiant.id}>
              <TableCell>{etudiant.CNE}</TableCell>
              <TableCell>{etudiant.nom}</TableCell>
              <TableCell>{etudiant.prenom}</TableCell>
              <TableCell>{etudiant.email}</TableCell>
              <TableCell>
                {notes[etudiant.CNE]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EtudiantsList;
