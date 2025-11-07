import "./ContentBox.css"
import AddForm from "./Forms/AddForm"
import DeleteForm from "./Forms/DeleteForm";
import EditForm from "./Forms/EditForm";

function ContentBox({ type }) {
  const renderContent = () => {
    switch (type) {
      case "adauga":
        return <div><AddForm showHeader={true}/></div>
      case "sterge":
        return <div><DeleteForm/></div>;
      case "editeazaAnunt":
        return <div><EditForm/></div>;
      case "editeazaProfil":
        return <div>👤 Setarile profilului</div>;
      default:
        return <div>Selecteaza o optiune din meniu</div>;
    }
  };

  return <div className="container-box">{renderContent()}</div>;
}

export default ContentBox;