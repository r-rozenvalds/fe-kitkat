import { useEffect, useState } from "react";
import CreateNewItem from "./Store/CreateNewItem";
import Navbar from "./Navbar";
import API from "../axiosApi";
import ManageStoreItems from "./Store/ManageStoreItems";
import Confirmation from "./Misc/Confirmation";

const AdminPanel = () => {

    const [creatorWindow, setCreatorWindow] = useState(false);
    const [storeItemWindow, setStoreItemWindow] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [users, setUsers] = useState(0);
    const [posts, setPosts] = useState(0);
    const [friendships, setFriendships] = useState(0);
    const [items, setItems] = useState(0);
    const [latest, setLatest] = useState("");
    const [userCount, setUserCount] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [user ,setUser] = useState(null);

    const getStats = () => {
        setRefresh(false);
        API.get('/users').then((response) => {
            setUsers(response.data);
        })
        API.get('/usercount').then((response) => {
            setUserCount(response.data);
        })
        API.get('/posts').then((response) => {
            setPosts(response.data);
        })
        API.get('/itemcount').then((response) => {
            setItems(response.data);
        })
        API.get('/friendships').then((response) => {
            setFriendships(response.data);
        })
        API.get('/latestuser').then((response) => {
            const [date, time] = response.data.created_at.split("T");
            const [year, month, day] = date.split("-");
            setLatest(`${time.substr(0, 8)} ${day}/${month}/${year}`);
        })
    }

    useEffect(() => {
        getStats();
    }, [refresh])

    const deleteUser = () => {
        setShowConfirmation(false);
        API.delete(`/users/${users[user].id}`).then((response) => {
            console.log(response);
            setRefresh(true);
        })
    }

    function listUsers() {
        const allUsers = Object.keys(users).map((user, i) => (
            <div className="p-3 rounded flex flex-col justify-between text-white font-SF-Pro bg-black-background h-72 w-44" key={i}>
                <div className="rounded-full w-32 h-32 place-self-center bg-cover bg-center" style={{ backgroundImage: `url(/images/tempprofilepic.png)` }}></div>
                <div className="">
                    <a href={`/users/${users[user].id}`} className="font-SF-Pro text-lg font-bold">{users[user].username}</a>
                    <p className="flex justify-between">LVL <span>{Math.floor(users[user].exp / 100)}</span></p>
                    <p>{users[user].created_at.substr(0, 10)}</p>
                    <button onClick={() => { setShowConfirmation(true); setUser(i) }} className="text-white rounded bg-rose-400 font-SF-Pro font-bold w-full mt-4 text-2xl">Delete</button>

                </div>
            </div>
        ))
        return allUsers;
    }

    return (
        <div className="w-full h-screen bg-black-background overflow-hidden">
            {creatorWindow && <CreateNewItem onClose={() => setCreatorWindow(false)} />}
            {storeItemWindow && <ManageStoreItems onClose={() => setStoreItemWindow(false)} />}
            {showConfirmation && <Confirmation message="delete this user" onConfirm={deleteUser} onCancel={() => setShowConfirmation(false)}/>}
            <div className=" xl:w-3/4 h-full mx-auto">
                <Navbar />
                <div className="flex flex-col mt-1 bg-black-container w-full h-full">
                    <div className="flex flex-col w-full items-center mt-6 gap-6">
                        <div className="flex xl:w-2/3 w-full bg-black-background rounded-md">
                            <table className="table-auto text-white text-xs xl:text-base font-SF-Pro w-full text-center">
                                <thead>
                                    <tr>
                                        <th>Users</th>
                                        <th>Posts</th>
                                        <th>Friendships</th>
                                        <th>Items</th>
                                        <th>Most recent sign up</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{userCount}</td>
                                        <td>{posts}</td>
                                        <td>{friendships}</td>
                                        <td>{items}</td>
                                        <td>{latest}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={() => setRefresh(true)} disabled={refresh} className="h-full disabled:text-zinc-500 text-white font-SF-Pro border-s-2 border-black-container font-semibold p-2">
                                Refresh
                            </button>
                        </div>
                        <div className="flex gap-12">
                            <button onClick={() => setCreatorWindow(true)} className="font-SF-Pro p-2 text-white text-2xl px-12 border-black-background border-2 hover:bg-purple-interact">Create new item</button>
                            <button onClick={() => setStoreItemWindow(true)} className="font-SF-Pro p-2 text-white text-2xl px-12 border-black-background border-2 hover:bg-purple-interact">Manage store items</button>
                        </div>
                    </div>
                    <form className="flex flex-col items-center mt-6">
                        <div className="flex">
                            <input className="text-3xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Username..." type="text"></input>
                            <button className="font-SF-Pro text-white text-2xl px-6 border-black-background border-2 hover:bg-purple-interact">Search</button>
                        </div>
                    </form>
                    <div className="overflow-y-auto mb-24">
                        <div className="grid grid-cols-5 mt-8 place-items-center px-12 gap-12 mx-12 ">
                            {listUsers()}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;