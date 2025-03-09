import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useArtist } from "../../context/ArtistContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import './style.css';

const FormEvent = () => {
    const [name, setName] = useState("");
    const [fees, setFees] = useState("");
    const [dateEvent, setDateEvent] = useState("");
    const [adress, setAdress] = useState("");
    const { artist, setArtist } = useArtist(); // Uses the artist value from the context
    const { id } = useParams(); // Captures the event ID for editing
    const navigate = useNavigate();

    // Function to load event data when editing
    useEffect(() => {
        if (id) {
            const fetchEvent = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/event/show/${id}`);
                    const eventData = response.data;
                    setName(eventData.name);
                    setFees(eventData.fees);
                    setDateEvent(eventData.date_event);
                    setAdress(eventData.adress);
                    setArtist(eventData.artist_selected); // Sets the selected artist in the context
                } catch (error) {
                    console.error('Error fetching event data:', error);
                }
            };
            fetchEvent();
        }
    }, [id, setArtist]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = {
            name: name,
            artist_selected: artist,
            fees: parseFloat(fees),
            date_event: dateEvent,
            adress: adress,
        };

        try {
            if (id) {
                // Edits the existing event
                await axios.put(`http://127.0.0.1:8000/api/event/update/${id}`, eventData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            } else {
                // Creates a new event
                await axios.post('http://127.0.0.1:8000/api/event/store', eventData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            navigate("/FormSucess");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">{id ? "Edit Event" : "Event Registration"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Event name<span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="artist" className="form-label">
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
                    <label htmlFor="fees" className="form-label">
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
                    <label htmlFor="dateEvent" className="form-label">
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
                    <label htmlFor="adress" className="form-label">
                        Address
                    </label>
                    <textarea
                        className="form-control"
                        id="adress"
                        rows="3"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                    ></textarea>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                        {id ? "Save Changes" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormEvent;