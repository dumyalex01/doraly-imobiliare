
import "./AdminPage.css"
import ContentBox from "./ContentBox";
import { useState } from "react";


function AdminPage(){

    const [activeSection, setActiveSection] = useState("adauga");

    return (

        <div className="page-container">
            <div className="navbar-container">
                <ul className="navbar-list">
                    <li>
                        <button onClick={() => setActiveSection("adauga")}>
                            Adauga anunt
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection("sterge")}>
                            Sterge anunt
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection("editeazaAnunt")}>
                            Editeaza anunt
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection("editeazaProfil")}>
                            Editeaza profil
                        </button>
                    </li>
                </ul>
            </div>
            <div className="content-container">
                <ContentBox type={activeSection}/>
            </div>
        </div>
    );
}

export default AdminPage;