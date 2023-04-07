import React from "react";
import { Routes, Route } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import SavedCharacter from "./components/SavedCharacter";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/saved-character" element={<SavedCharacter />} />
        </Routes>
    );
};

export default App;
