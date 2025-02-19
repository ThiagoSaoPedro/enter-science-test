import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FormularioEvent from './pages/Form';
import { ArtistProvider } from './context/ArtistContext';
import FormSucess from './pages/FormSucess';
import FormList from './pages/FormList';

const App = () => {
    return (
        //Call the 'ArtistProvider' function and create the code routes within the react structure, and transform the current url into the route to the 'Home'.
        <ArtistProvider>
            <Router future={{ v7_relativeSplatPath: true }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Form" element={<FormularioEvent />} />
                    <Route path="/FormSucess" element={<FormSucess />} />
                    <Route path="/FormList" element={<FormList />} />
                </Routes>
            </Router>
        </ArtistProvider>
    );
};

export default App;