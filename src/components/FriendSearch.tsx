import API from "../axiosApi";
import Navbar from "./Navbar";
import { useEffect, useState } from 'react';


const FriendSearch = () => {

    const [searchTerm, setSearchTerm] = useState();
    const [searchResults, setSearchResults] = useState({});
    const [toggleFriends, setToggleFriends] = useState(true);
    const [togglePending, setTogglePending] = useState(false);
    const [friendships, setFriendships] = useState([]);
    const [pendingFriendships, setPendingFriendships] = useState([]);

    const search = (e) => {
        e.preventDefault();
        setSearchResults({});
        API.get('/search', { params: { term: searchTerm } }).then((response) => {
            setSearchResults(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const results = Object.keys(searchResults).map((user, i) => (
        <tr onClick={() => window.location.assign(`/users/${searchResults[user].id}`)} className="border-b-2 cursor-pointer border-black-background h-14 hover:underline" key={i}>
            <td>{searchResults[user].username}</td>
            <td>{Math.floor(searchResults[user].exp / 100)}</td>
            <td>{searchResults[user].created_at.substr(0, 10)}</td>
        </tr>
    ))

    useEffect(() => {
        API.get(`/user`).then((response) => {
            API.get(`user/${response.data.id}/friends`).then((response) => {
                setFriendships(response.data)
                console.log(response.data)
            })
            API.get(`user/${response.data.id}/pendingfriends`).then((response) => {
                setPendingFriendships(response.data)
                console.log(response.data)
            })
        }).catch((error) => {
            console.log(error);
        })

    }, [])

    function listFriends() {
        const friends = Object.keys(friendships).map((user, i) => (
            <tr onClick={() => window.location.assign(`/users/${friendships[user].id}`)} className="border-b-2 cursor-pointer border-black-background h-14 hover:underline" key={i}>
                <td>{friendships[user].username}</td>
                <td>{Math.floor(friendships[user].exp / 100)}</td>
                <td>{friendships[user].updated_at.substr(0, 10)}</td>
            </tr>
        ))
        return friends;
    }

    function listPendingFriends() {
        const pendingFriends = Object.keys(pendingFriendships).map((user, i) => (
            <tr onClick={() => window.location.assign(`/users/${pendingFriendships[user].id}`)} className="border-b-2 cursor-pointer border-black-background h-14 hover:underline text-gray-400" key={i}>
                <td>{pendingFriendships[user].username}</td>
                <td>{Math.floor(pendingFriendships[user].exp / 100)}</td>
                <td>{pendingFriendships[user].updated_at.substr(0, 10)}</td>
            </tr>
        ))
        return pendingFriends;
    }

    return (
        <div className="w-full h-screen bg-black-background overflow-hidden">
            <div className=" w-3/4 h-full mx-auto">
                <Navbar />
                <div className="flex flex-col mt-1 bg-black-container h-full gap-2">
                    <div className="flex w-full text-center">
                        <div style={!toggleFriends ? { borderBottom: "4px solid #0E1111" } : { borderBottom: "none" }} className="text-white text-2xl font-SF-Pro font-medium w-1/2 border-e-2 border-black-background"><button className="w-full h-full p-3" onClick={() => setToggleFriends(true)}>Friends</button></div>
                        <div style={toggleFriends ? { borderBottom: "4px solid #0E1111" } : { borderBottom: "none" }} className="text-white text-2xl font-SF-Pro font-medium w-1/2 border-s-2 border-black-background"><button className="w-full h-full p-3" onClick={() => setToggleFriends(false)}>Search users</button></div>
                    </div>
                    {toggleFriends && <div>
                        <h1 onClick={() => console.log(friends)} className="text-white text-4xl font-SF-Pro font-medium p-6">Your kitty friends</h1>
                        <form onSubmit={search} className="flex flex-col items-center gap-3">
                            <div className="flex">
                                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-3xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Username..." type="text"></input>
                                <button onClick={search} className="font-SF-Pro text-white text-2xl px-6 border-black-background border-2 hover:bg-purple-interact">Search</button>
                            </div>
                            <div className="flex gap-2">
                                <input checked={togglePending} onChange={() => togglePending ? setTogglePending(false) : setTogglePending(true)} className="w-5 accent-purple-interact" id="pending" type="checkbox" />
                                <label htmlFor="pending" className="text-white text-xl text-center font-SF-Pro">Show sent friend requests</label>
                            </div>
                        </form>
                        <div className="mx-6 flex content-center  max-h-[66%] overflow-y-scroll">
                            <table className="table-auto w-full text-white grow-0 text-xl text-center font-SF-Pro">
                                <tr className="border-b-2 border-black-background h-14">
                                    <th className="">Username</th>
                                    <th>Level</th>
                                    <th>Date befriended</th>
                                </tr>



                                {togglePending && listPendingFriends()}
                                {listFriends()}
                            </table>
                        </div>
                    </div>}
                    {!toggleFriends && <div>
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
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default FriendSearch;