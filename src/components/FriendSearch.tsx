import API from "../axiosApi";
import Navbar from "./Navbar";
import {useState} from 'react';


const FriendSearch = () => {

    const [searchTerm, setSearchTerm] = useState();
    const [searchResults, setSearchResults] = useState({});

    const search = (e) => {
        e.preventDefault();
        setSearchResults({});
        API.get('/search', {params: {term: searchTerm}}).then((response)=> {
            setSearchResults(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const results = Object.keys(searchResults).map((user, i)  => (
        <tr className="border-b-2 border-black-background h-14" key={i}>
            <td>{searchResults[user].username}</td>
            <td>{Math.floor(searchResults[user].exp/100)}</td>
            <td>{searchResults[user].created_at.substr(0, 10)}</td>
        </tr>
    )

    )

    return (
        <div className="w-full h-screen bg-black-background overflow-hidden">
            <div className=" w-3/4 h-full mx-auto">
                <Navbar />
                <div className="flex flex-col mt-1 bg-black-container h-full gap-8">
                    <h1 className="text-white text-4xl font-SF-Pro font-medium p-6">Find other cats!</h1>
                    <form onSubmit={search} className="flex flex-col items-center">
                        <div className="flex">
                            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-3xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Username..." type="text"></input>
                            <button onClick={search} className="font-SF-Pro text-white text-2xl px-6 border-black-background border-2 hover:bg-purple-interact">Search</button>
                        </div>
                    </form>
                    <div className="mx-6 flex content-center  max-h-[66%] overflow-y-scroll">
                        <table className="table-auto w-full text-white grow-0 text-xl text-center">
                            <tr className="border-b-2 border-black-background h-14">
                                <th className="">Username</th>
                                <th>Level</th>
                                <th>Date created</th>
                            </tr>

                            

                            
                            {results}
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FriendSearch;