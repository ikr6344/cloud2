import "./adminwork.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const AdminWork = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <iframe src="https://script.google.com/macros/s/AKfycbyCl-IHNsKvBqolutDPpTsnB3xzpS6GkZjInFYWAmVOLOUpPdnKvgc6u4H5xAbavB4h/exec" title="Your Google Apps Script Page" width="100%" height="600px"></iframe>

            </div>
        </div>
    )
}

export default AdminWork