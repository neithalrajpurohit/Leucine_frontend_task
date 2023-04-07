import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import {
    getSavedCharacters,
    removeSavedCharacters,
} from "../features/characterSlice";
import CharacterCard from "./CharacterCard";
import DetailsModal from "./DetailsModal";

const SavedCharacter = () => {
    const dispatch = useDispatch();
    const characterData = useSelector((state) => state.character);
    const [detailsModal, setDetailsModal] = useState({
        visible: false,
        data: null,
    });

    useEffect(() => {
        dispatch(getSavedCharacters());
    }, []);

    // handle remove character from localstorgae
    const handleRemoveCharacter = (characterID) => {
        dispatch(removeSavedCharacters({ characterID }));
    };

    //for shwoing details of character inside modal
    const handleShowModal = (characterData) => {
        setDetailsModal({ visible: true, data: characterData });
    };
    const closeModal = () => {
        setDetailsModal({ visible: false, data: null });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-center mt-20">
                <h2 className="text-4xl">Saved Characters</h2>
            </div>

            <div className="flex justify-center items-center mt-20 gap-10 flex-wrap">
                {characterData.savedCharacters?.map((character) => {
                    return (
                        <CharacterCard
                            key={character.id}
                            {...character}
                            savedCard
                            handleRemoveCharacter={handleRemoveCharacter}
                            handleShowModal={handleShowModal}
                        />
                    );
                })}
            </div>

            {/* {details Modal} */}
            {detailsModal.visible && (
                <DetailsModal
                    closeModal={closeModal}
                    detailsModal={detailsModal}
                />
            )}
        </motion.div>
    );
};

export default SavedCharacter;
