import { useState } from "react";
import Navbar from "./Navbar";

const Store = () => {
    const [searchTerm, setSearchTerm] = useState();
    const [searchResults, setSearchResults] = useState({});
    const [upload, setUpload] = useState();

    return (
        <div className="w-full h-screen bg-black-background overflow-hidden">
            <div className=" w-3/4 h-full mx-auto">
                <Navbar />
                <div className="flex flex-col mt-1 bg-black-container h-full gap-8">
                    <h1 className="text-white text-4xl font-SF-Pro font-medium p-6">Treat your cat!</h1>
                    <form className="flex flex-col items-center">
                        <div className="flex">
                            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-3xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Search for item..." type="text"></input>
                            <button className="font-SF-Pro text-white text-2xl px-6 border-black-background border-2 hover:bg-purple-interact">Search</button>
                        </div>
                    </form>
                    <div className="">
                        <input type="file" value={upload} onChange={(e) => setUpload(e.target.value)}></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Store;