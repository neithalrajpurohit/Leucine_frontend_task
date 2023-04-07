import React from "react";
import { motion } from "framer-motion";

const SearchBox = (props) => {
    const { handleOnChange, searchQuery, searchResults, handleShowModal } =
        props;

    return (
        <div className="z-50 max-w-[500px] mx-auto mt-20 relative border border-[rgba(0,0,0,.1)] rounded-lg">
            <div className="hover:scale-105 duration-75 transition-transform">
                <input
                    onChange={handleOnChange}
                    value={searchQuery}
                    type="text"
                    placeholder="Search for characters"
                    className="input shadow-lg w-full focus:outline-none pr-[60px]"
                />
            </div>
            {searchResults?.results && (
                <div className="w-full bg-white max-h-[500px] pb-4 px-5 overflow-y-auto absolute shadow-2xl rounded-br-3xl rounded-bl-3xl">
                    {searchResults.results.map((result) => {
                        return (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleShowModal(result);
                                }}
                                className="flex items-center pt-2 gap-10 cursor-pointer"
                                key={result.id}
                            >
                                <motion.div
                                    layoutId={result.id}
                                    className="h-[100px] w-[100px]"
                                >
                                    <img
                                        src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                                        alt="photo"
                                        className="w-full h-full"
                                    />
                                </motion.div>
                                <div>
                                    <p>{result.name}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
