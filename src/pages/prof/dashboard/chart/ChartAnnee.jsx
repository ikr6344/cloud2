import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import "./chart.scss";
import { useParams } from "react-router-dom";

const BarChartDemo = () => {
    const [profCIN, setProfCIN] = useState(null); // État pour stocker le CIN du professeur
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const { userId } = useParams();

    useEffect(() => {
        // Effectuez une requête pour récupérer les informations du professeur
        const fetchProfInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3000/prof/${userId}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des informations du professeur');
                }
                const profData = await response.json();
                setProfCIN(profData.CIN); // Extraire le CIN du professeur de la réponse
            } catch (error) {
                console.error('Erreur lors de la récupération des informations du professeur:', error);
            }
        };

        fetchProfInfo();
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (profCIN) {
                    // Récupérer les éléments de module pour le professeur spécifique
                    const elementsResponse = await axios.get(`http://localhost:3000/elementModule/prof/${profCIN}/elements`);
                    const elements = elementsResponse.data.elementsModule;

                    // Stocker les codes uniques des éléments de module dans un ensemble
                    const uniqueCodes = new Set();

                    // Préparer les données pour le graphique
                    const datasets = [];

                    // Pour chaque élément de module
                    for (const element of elements) {
                        // Ajouter le code de l'élément à l'ensemble des codes uniques
                        uniqueCodes.add(element.code);

                        // Récupérer les notes pour chaque année universitaire associée à cet élément
                        const anneeUniversitaire = element.AnneeUniversitaire;
                        const noteResponse = await axios.get(`http://localhost:3000/note/notes/${element.code}/${anneeUniversitaire}`);
                        const notes = noteResponse.data.notes;
                        const average = notes.reduce((acc, note) => acc + note.note, 0) / notes.length;
                    
                        // Vérifier si le code existe déjà dans les labels
                        const codeIndex = Array.from(uniqueCodes).indexOf(element.code);
                        if (codeIndex === -1) {
                            // Si le code n'existe pas, ajouter une nouvelle entrée dans les labels
                            uniqueCodes.add(element.code);
                        }
                    
                        // Trouver ou créer le dataset correspondant à l'année universitaire
                        const datasetIndex = datasets.findIndex(dataset => dataset.label === anneeUniversitaire);
                        if (datasetIndex === -1) {
                            // Si le dataset pour l'année universitaire n'existe pas, le créer
                            datasets.push({
                                label: anneeUniversitaire,
                                backgroundColor: getRandomColor(),
                                data: [average]
                            });
                        } else {
                            // Si le dataset pour l'année universitaire existe, mettre à jour les données
                            datasets[datasetIndex].data[codeIndex] = average;
                        }
                    }

                    // Mettre à jour le state avec les données du graphique
                    setChartData({ labels: Array.from(uniqueCodes), datasets });
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, [profCIN]);

    // Fonction pour obtenir une couleur aléatoire pour chaque dataset
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="chart">
            <h5>Moyenne des notes par année universitaire</h5>
            <Chart type="bar" data={chartData} options={{ barThickness: 20 , categorySpacing: 5 }} style={{width: '100%', height: '50vh'}} />
        </div>
    );
};

export default BarChartDemo;
