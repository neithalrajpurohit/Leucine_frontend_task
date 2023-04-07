import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

import {
    clearSearchResults,
    fetchCharacters,
    removeSavedCharacters,
    saveCharacter,
    searchCharacters,
} from "../features/characterSlice";
import SearchBox from "./SearchBox";
import CharacterCard from "./CharacterCard";
import { useNavigate } from "react-router-dom";
import DetailsModal from "./DetailsModal";

const CharacterList = () => {
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [detailsModal, setDetailsModal] = useState({
        visible: false,
        data: null,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const characterData = useSelector((state) => state.character);

    useEffect(() => {
        dispatch(fetchCharacters({ pageNum: currentPageNum }));
    }, [currentPageNum]);

    // handle saving character to localstorgae
    const handleSaveCharacter = (character) => {
        dispatch(saveCharacter({ character }));
    };

    // handle remove character from localstorgae
    const handleRemoveCharacter = (characterID) => {
        dispatch(removeSavedCharacters({ characterID }));
    };

    // handle pagination
    const handleNextPage = () => {
        setCurrentPageNum(currentPageNum + 1);
    };
    const handlePrevPage = () => {
        if (currentPageNum >= 2) {
            setCurrentPageNum(currentPageNum - 1);
        }
    };

    //handle search query change
    const handleOnChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if (searchQuery.length >= 2) {
            dispatch(searchCharacters({ searchQuery, limit: 20 }));
        }
    }, [searchQuery]);

    //for shwoing details of character inside modal
    const handleShowModal = (characterData) => {
        setDetailsModal({ visible: true, data: characterData });
    };
    const closeModal = () => {
        setDetailsModal({ visible: false, data: null });
    };

    return (
        <div onClick={() => dispatch(clearSearchResults())}>
            <SearchBox
                searchQuery={searchQuery}
                handleOnChange={handleOnChange}
                searchResults={characterData.searchResults}
                handleShowModal={handleShowModal}
            />

            {/* {skeleton loading } */}
            {characterData.isLoading ? (
                <div className="flex items-center justify-center gap-10 mt-20">
                    <Skeleton
                        baseColor="#efefef"
                        highlightColor="#e5e5e6"
                        height={400}
                        width={400}
                        style={{ borderRadius: "20px" }}
                    />
                    <Skeleton
                        baseColor="#efefef"
                        highlightColor="#e5e5e6"
                        height={400}
                        width={400}
                        style={{ borderRadius: "20px" }}
                    />
                    <Skeleton
                        baseColor="#efefef"
                        highlightColor="#e5e5e6"
                        height={400}
                        width={400}
                        style={{ borderRadius: "20px" }}
                    />
                </div>
            ) : (
                <div className="flex justify-center items-center mt-20 gap-10">
                    {characterData.allCharacters?.results?.map((character) => {
                        return (
                            <CharacterCard
                                key={character.id}
                                {...character}
                                handleSaveCharacter={handleSaveCharacter}
                                handleRemoveCharacter={handleRemoveCharacter}
                                handleShowModal={handleShowModal}
                            />
                        );
                    })}
                </div>
            )}

            {/* {prev next button} */}
            <div className="mt-[170px] flex justify-center gap-10">
                <button
                    className={`btn disabled:opacity-40 text-black border-none bg-primary  hover:bg-[#f7d029]`}
                    disabled={currentPageNum === 1}
                    onClick={handlePrevPage}
                >
                    Prev
                </button>
                <button
                    className="btn text-black border-none bg-primary hover:bg-[#f7d029]"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>

            {/* {details Modal} */}
            {detailsModal.visible && (
                <DetailsModal
                    closeModal={closeModal}
                    detailsModal={detailsModal}
                />
            )}

            {/* {Floation Button to view saved character} */}
            <div
                className="fixed bottom-[50px] right-[50px]"
                onClick={() => navigate("/saved-character")}
            >
                <button className="btn w-[100px] h-[60px] rounded-3xl border-none text-black bg-primary  hover:bg-[#f7d029]">
                    View Saved
                </button>
            </div>
        </div>
    );
};

export default CharacterList;
