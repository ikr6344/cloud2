import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const NotesGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Remplacez l'URL par l'API de votre serveur
    axios.get('http://localhost:3000/note/notes/NRS35205/2023-2024')
      .then(response => {
        const rawData = response.data.notes;

        // Transformez les données pour le graphique
        const groupedData = rawData.reduce((acc, note) => {
          const existing = acc.find((item) => item.name === note.etudiantCNE);

          if (existing) {
            existing.total += note.note;
            existing.count += 1;
          } else {
            acc.push({ name: note.etudiantCNE, total: note.note, count: 1 });
          }

          return acc;
        }, []);

        // Calculez la moyenne des notes pour chaque étudiant
        const chartData = groupedData.map(item => ({
          name: item.name,
          Moyenne: item.total / item.count,
        }));

        setData(chartData);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  return (
    <div className="chart">
      <div className="title">Moyenne des Notes par Étudiant</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="moyenne" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Moyenne"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#moyenne)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NotesGraph;
