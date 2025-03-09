import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useArtist } from "../../context/ArtistContext";

const FormList = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Function to fetch events from the API
    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/event/list");
            setEventos(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error when searching for events:", error);
            setError(error);
            setLoading(false);
        }
    };

    // Function to delete an event
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/event/delete/${id}`);
            fetchEvents(); // Updates the event list after deletion
        } catch (error) {
            console.error("Error when deleting event:", error);
        }
    };

    // Function to redirect to the edit page
    const handleEdit = (id) => {
        navigate(`/Form/${id}`);
    };

    // Fetches events when the component loads
    useEffect(() => {
        fetchEvents();
    }, []);

    // Displays a loading message
    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    // Displays an error message
    if (error) {
        return <div className="alert alert-danger text-center mt-5">Error loading events: {error.message}</div>;
    }

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <div className="w-75">
                <h2 className="text-center mb-4">List of Events</h2>
                <div className="table-responsive">
                    <table className="table table-borderless table-hover text-center">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Artist</th>
                                <th className="text-center">Fees</th>
                                <th className="text-center">Date of event</th>
                                <th className="text-center">Adress</th>
                                <th className="text-center">Actions</th> {/* Column for actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.map((evento) => (
                                <tr key={evento.id}>
                                    <td>{evento.name}</td>
                                    <td>{evento.artist_selected}</td>
                                    <td>{evento.fees}</td>
                                    <td>{evento.date_event}</td>
                                    <td>{evento.adress}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(evento.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(evento.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link to="/" className="btn btn-primary mt-4">Back to home page</Link>
        </div>
    );
};

export default FormList;