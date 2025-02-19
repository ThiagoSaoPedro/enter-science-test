import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListaEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        // try making the request to get the data 
        try {
            const response = await axios.get("http://127.0.0.1:8000/event/list");
            setEventos(response.data);
            setLoading(false);
            //error handling
        } catch (error) {
            console.error("Error when searching for events:", error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) {
        //loading data
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        //error handling
        return <div className="alert alert-danger text-center mt-5">Error loading events: {error.message}</div>;
    }

    return (
        //return the page with data
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

export default ListaEventos;
