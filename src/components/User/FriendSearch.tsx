import API from "../../axiosApi";
import Navbar from "../Navbar";
import { useEffect, useState } from 'react';


const FriendSearch = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [toggleFriends, setToggleFriends] = useState(true);
    const [togglePending, setTogglePending] = useState(false);
    const [friendships, setFriendships] = useState([]);
    const [pendingFriendships, setPendingFriendships] = useState([]);

    const search = (e) => {
        e.preventDefault();
        setSearchResults({});
        if (searchTerm.length != 0) {
            API.get('/search', { params: { term: searchTerm } }).then((response) => {
                setSearchResults(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const results = Object.keys(searchResults).map((user, i) => (
        <div onClick={() => window.location.assign(`/users/${searchResults[user].id}`)} className="p-3 cursor-pointer rounded flex flex-col justify-between text-white font-SF-Pro bg-black-background h-60 w-44" key={i}>
            <div className="rounded-full w-32 h-32 place-self-center bg-center bg-cover" style={{ backgroundImage: `url(/images/tempprofilepic.png)` }}></div>
            <div className="">
                <h1 className="font-SF-Pro text-lg font-bold">{searchResults[user].username}</h1>
                <p className="flex justify-between">LVL <span>{Math.floor(searchResults[user].exp / 100)}</span></p>
                <p>{searchResults[user].created_at.substr(0, 10)}</p>
            </div>
        </div>
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
            <div onClick={() => window.location.assign(`/users/${friendships[user].id}`)} className="p-3 cursor-pointer rounded flex flex-col justify-between text-white font-SF-Pro bg-black-background h-60 w-44" key={i}>
                <div className="rounded-full w-32 h-32 place-self-center bg-center bg-cover" style={{ backgroundImage: `url(/images/tempprofilepic.png)` }}></div>
                <div className="">
                    <h1 className="font-SF-Pro text-lg font-bold">{friendships[user].username}</h1>
                    <p className="flex justify-between">LVL <span>{Math.floor(friendships[user].exp / 100)}</span></p>
                    <p>{friendships[user].updated_at.substr(0, 10)}</p>
                </div>
            </div>
        ))
        return friends;
    }

    function listPendingFriends() {
        const pendingFriends = Object.keys(pendingFriendships).map((user, i) => (
            <div onClick={() => window.location.assign(`/users/${pendingFriendships[user].id}`)} className="p-3 cursor-pointer rounded flex flex-col justify-between text-white font-SF-Pro bg-black-background h-60 w-44" key={i}>
                <div className="rounded-full w-32 h-32 place-self-center bg-cover bg-center" style={{ backgroundImage: `url(/images/tempprofilepic.png)` }}></div>
                <div className="">
                    <h1 className="font-SF-Pro text-lg font-bold">{pendingFriendships[user].username}</h1>
                    <p className="flex justify-between">LVL <span>{Math.floor(pendingFriendships[user].exp / 100)}</span></p>
                    <p>{pendingFriendships[user].updated_at.substr(0, 10)}</p>
                </div>
            </div>
        ))
        return pendingFriends;
    }

    return (
        <div className="w-full min-h-screen h-fit bg-black-background">
            <div className=" xl:w-3/4 h-full mx-auto">
                <Navbar />
                <div className="flex flex-col mt-1 min-h-screen bg-black-container pb-24 h-fit gap-2">
                    <div className="flex w-full text-center">
                        <div style={!toggleFriends ? { borderBottom: "4px solid #0E1111" } : { borderBottom: "none" }} className="text-white text-lg xl:text-2xl font-SF-Pro font-medium w-1/2 border-e-2 border-black-background"><button className="w-full h-full p-3" onClick={() => setToggleFriends(true)}>Friends</button></div>
                        <div style={toggleFriends ? { borderBottom: "4px solid #0E1111" } : { borderBottom: "none" }} className="text-white text-lg xl:text-2xl font-SF-Pro font-medium w-1/2 border-s-2 border-black-background"><button className="w-full h-full p-3" onClick={() => setToggleFriends(false)}>Search users</button></div>
                    </div>
                    {toggleFriends && <div>
                        <h1 className="text-white text-2xl xl:text-4xl font-SF-Pro font-medium p-6">Your kitty friends</h1>
                        <form onSubmit={search} className="flex flex-col items-center gap-3">
                            <div className="flex">
                                <input autoFocus value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-lg xl:text-3xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Username..." type="text"></input>
                                <button onClick={search} className="font-SF-Pro text-white text-lg xl:text-2xl px-6 border-black-background border-2 hover:bg-purple-interact">Search</button>
                            </div>
                            <div className="flex gap-2">
                                <input checked={togglePending} onChange={() => togglePending ? setTogglePending(false) : setTogglePending(true)} className="xl:w-5 accent-purple-interact" id="pending" type="checkbox" />
                                <label htmlFor="pending" className="text-white xl:text-xl text-center font-SF-Pro">Show sent friend requests</label>
                            </div>
                        </form>
                        <div className="mx-6 flex content-center  max-h-[66%]">

                            <div className="grid xl:grid-cols-5 mt-8 place-items-center px-12 gap-12 mx-12">

                                {togglePending && listPendingFriends()}
                                {listFriends()}
                            </div>
                        </div>
                    </div>}
                    {!toggleFriends && <div className="">
                        <h1 className="text-white text-2xl xl:text-4xl  font-SF-Pro font-medium p-6">Find other cats!</h1>
                        <form onSubmit={search} className="flex flex-col items-center">
                            <div className="flex">
                                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-lg xl:text-3xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Username..." type="text"></input>
                                <button onClick={search} className="font-SF-Pro text-white text-lg xl:text-2xl px-6 border-black-background border-2 hover:bg-purple-interact">Search</button>
                            </div>
                        </form>
                        <div className="">
                            <div className="grid xl:grid-cols-5 mt-8 place-items-center px-12 gap-12 mx-12">
                                {results}

                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default FriendSearch;