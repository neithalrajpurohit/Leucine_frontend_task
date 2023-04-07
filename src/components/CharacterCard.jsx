import React, { useEffect } from "react";
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { getSavedCharacters } from "../features/characterSlice";

const CharacterCard = (props) => {
    const {
        handleSaveCharacter,
        handleRemoveCharacter,
        handleShowModal,
        savedCard,
        ...otherProps
    } = props;

    const { id, name, thumbnail } = otherProps;

    const dispatch = useDispatch();
    const characterData = useSelector((state) => state.character);

    useEffect(() => {
        dispatch(getSavedCharacters());
    }, [characterData.savedCharacters.length]);

    let isSaved = characterData.savedCharacters.find(
        (character) => character.id === id
    );

    return (
        <div
            className="w-[440px] relative z-10 cursor-pointer mb-20"
            onClick={() => {
                handleShowModal(otherProps);
            }}>
            <motion.div
                layoutId={id}
                className="h-[40vh] overflow-hidden rounded-3xl shadow-2xl">
                <img
                    src={`${thumbnail.path}.${thumbnail.extension}`}
                    alt="photo"
                    className="w-full h-full"
                />
            </motion.div>
            <div className="flex justify-center relative">
                <div className=" absolute w-[90%] -z-10 h-[200px] -bottom-[90px] bg-white shadow-xl rounded-3xl flex justify-between items-end px-5 pb-7">
                    <p className="text-[19px]">{name.substring(0, 60)}</p>
                    {!savedCard ? (
                        <div>
                            {isSaved ? (
                                <AiFillHeart
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveCharacter(id);
                                    }}
                                    className="text-3xl text-red-500"
                                />
                            ) : (
                                <AiOutlineHeart
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSaveCharacter(otherProps);
                                    }}
                                    className="text-3xl text-red-500"
                                />
                            )}
                        </div>
                    ) : (
                        <AiFillDelete
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveCharacter(id);
                            }}
                            className="text-3xl text-red-500"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
