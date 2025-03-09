// App.jsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FormEvent from './pages/Form';
import { ArtistProvider } from './context/ArtistContext';
import FormSucess from './pages/FormSucess';
import FormList from './pages/FormList';

const App = () => {
    return (
        <ArtistProvider>
            <Router future={{ v7_relativeSplatPath: true }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Form" element={<FormEvent />} />
                    <Route path="/Form/:id" element={<FormEvent />} /> {/* Rota para edição */}
                    <Route path="/FormSucess" element={<FormSucess />} />
                    <Route path="/FormList" element={<FormList />} />
                </Routes>
            </Router>
        </ArtistProvider>
    );
};

export default App;