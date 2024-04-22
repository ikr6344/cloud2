import React from 'react';
import './Student.scss';
import Sidebar from './sidebarstd/Sidebar';
import Chart from '../../components/chart/Chart';
import Featured from '../../components/featured/Featured';
import Widget from '../../components/widget/Widget';
import Navbar from '../../components/navbar/Navbar';
import WidgetWrapper from '../../components/widget/WidgetWrapper';
import NotesGraph from './NotesGraph'; // Assurez-vous que le chemin est correct

const Student = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="module" />
        </div>
        {/* Ajout du graphique des notes */}
        <div className="graphContainer">
          <div className="graphTitle">Moyenne des Notes par Année Universitaire</div>
          <NotesGraph />
        </div>

        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          {/* Ajoutez d'autres composants ici si nécessaire */}
        </div>
      </div>
    </div>
  );
};

export default Student;
