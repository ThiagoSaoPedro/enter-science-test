import { createContext, useContext, useState} from "react";

// It creates a global context for sharing data between components without having to pass props manually.
const ArtistContext = createContext()

export const ArtistProvider = ({children}) => {
  const [artist, setArtist] = useState("Name of artist");

  return (
    //Set and return artist
    <ArtistContext.Provider value={{ artist, setArtist }}>
      {children}
    </ArtistContext.Provider>
  );
};


export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) throw new Error("useArtist must be used inside an ArtistProvider");
  return context;
};