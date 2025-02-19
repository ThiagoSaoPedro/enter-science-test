import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); //Declares the navigate variable as the function, useNavigate to navigate between the routes created

  const handleSubmit = () => { //Function for when the user clicks on the list button to be redirected to the list page
    navigate("/FormList");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      {/* Calls the SearchBar function */}
      <SearchBar /> 
      <button onClick={handleSubmit} className="btn btn-primary mt-3">
      List Events
      </button>
    </div>
  );
}
