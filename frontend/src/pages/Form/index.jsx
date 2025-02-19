import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useArtist } from "../../context/ArtistContext";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import './style.css';


const FormEvent = () => {
    const [name, setName] = useState("");
    const [fees, setFees] = useState("");
    const [dateEvent, setDateEvent] = useState("");
    const [adress, setAdress] = useState("");
    const { artist } = useArtist(); // Uses the artist value set by the useArtist function of ArtistContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = {
            name: name,
            artist_selected: artist,
            fees: parseFloat(fees),
            date_event: dateEvent,
            adress: adress,
        };

        const formatedData = JSON.stringify(eventData, null, 2) //formats the data as json to be sent to the api

        try {
            //try sending the data using axios to the api url
            const response = await axios.post('http://127.0.0.1:8000/event/store', formatedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            navigate("/FormSucess");

        } catch (error) { //error handling
            console.error('Error when registering event:', error);
            if (error.response) {
                console.log('Server response:', error.response.data);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Event Registration</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                        Event name<span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="artista" className="form-label">
                        Artist Selected<span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="artist"
                        className="form-control"
                        value={artist}
                        readOnly
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cache" className="form-label">
                        Fees
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="fees"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="dataEvento" className="form-label">
                        Date of Event<span className="required">*</span>
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateEvent"
                        value={dateEvent}
                        onChange={(e) => setDateEvent(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="endereco" className="form-label">
                        Adress
                    </label>
                    <textarea
                        className="form-control"
                        id="adress"
                        rows="3"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                    ></textarea>
                </div>

                {/* Botão de envio */}
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default function App() {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <FormEvent />
        </div>
    );
}