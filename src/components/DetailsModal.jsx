import React from "react";
import { motion } from "framer-motion";
import { AiOutlineCloseCircle } from "react-icons/ai";

const DetailsModal = ({ closeModal, detailsModal }) => {
    return (
        <div
            className="px-10 py-8 fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.9)] z-50"
            onClick={(e) => {
                e.stopPropagation();
                closeModal();
            }}
            exit={{ opacity: 0, scale: 0 }}
        >
            <motion.div
                layoutId={detailsModal?.data?.id}
                className="max-w-[1200px] max-h-[800px] mx-auto px-10 py-8 rounded-3xl bg-white"
            >
                <div className="w-full cursor-pointer" onClick={closeModal}>
                    <AiOutlineCloseCircle className="ml-auto text-3xl" />
                </div>
                <div className="w-[600px] h-[40vh]">
                    <img
                        src={`${detailsModal.data?.thumbnail?.path}.${detailsModal.data?.thumbnail?.extension}`}
                        className="w-full h-full"
                        alt="photo"
                    />
                </div>

                <div>
                    <p className="text-3xl mt-4 mb-4">
                        {detailsModal.data?.name}
                    </p>
                    <p className="text-gray-500">
                        {detailsModal.data?.description}
                    </p>

                    <ul className="mt-10">
                        <p className="font-semibold mb-2">Other Links</p>
                        {detailsModal?.data?.urls.map((url, i) => {
                            return (
                                <div key={i}>
                                    <a
                                        href={url.url}
                                        target="_blank"
                                        className="capitalize underline block py-1"
                                    >
                                        {url.type}
                                    </a>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export default DetailsModal;
