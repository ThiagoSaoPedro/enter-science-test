// context/ArtistContext.js
import { createContext, useContext, useState } from "react";

const ArtistContext = createContext();

export const ArtistProvider = ({ children }) => {
  const [artist, setArtist] = useState("Name of artist");
  const [events, setEvents] = useState([]); // List of events

  // Function to add an event
  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  // Function to edit an event
  const editEvent = (id, updatedEvent) => {
    setEvents(events.map((event) => (event.id === id ? updatedEvent : event)));
  };

  // Function to delete an event
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <ArtistContext.Provider value={{ artist, setArtist, events, addEvent, editEvent, deleteEvent }}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) throw new Error("useArtist must be used inside an ArtistProvider");
  return context;
};