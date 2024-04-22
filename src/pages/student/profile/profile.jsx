import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.scss';
import Sidebar from '../sidebarstd/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

const Profile = ({ etudiantId }) => {
  const [etudiant, setEtudiant] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    cne: '',
    email: '',
    filiere: ''
  });

  useEffect(() => {
    const fetchEtudiantData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/etudiant/uUBjjJQoN6b0U76OLaHhc6qxLxv2`);
        setEtudiant(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'étudiant :', error);
      }
    };

    fetchEtudiantData();
  }, [etudiantId]);

  const handleChange = (e) => {
    setEtudiant({ ...etudiant, [e.target.name]: e.target.value });
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
    <div className="profile-container">
      <form>
        <label>
          Nom:
          <input type="text" name="nom" value={etudiant.nom} onChange={handleChange} />
        </label>
        <label>
          Prénom:
          <input type="text" name="prenom" value={etudiant.prenom} onChange={handleChange} />
        </label>
        <label>
          Date de naissance:
          <input type="TEXT" name="dateNaissance" value={new Date(etudiant.dateNaissance).toLocaleDateString()} onChange={handleChange} />
        </label>
        <label>
          CNE:
          <input type="text" name="cne" value={etudiant.CNE} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={etudiant.email} onChange={handleChange} />
        </label>
        <label>
          CIN:
          <input type="text" name="filiere" value={etudiant.CIN} onChange={handleChange} />
        </label>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Profile;
