import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Notes from "./Notes";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="modules" />
          <Widget type="filiere" />
          <Widget type="marks" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Marks added</div>
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default Home;
