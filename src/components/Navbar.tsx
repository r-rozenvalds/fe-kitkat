import { useEffect, useState } from "react";
import API from "../axiosApi";

const Navbar = () => {
    const [menuDropdown, setMenuDropdown] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [coins, setCoins] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [level, setLevel] = useState(0);
    const [incomingFriends, setIncomingFriends] = useState([]);
    const [refresh, setRefresh] = useState(0);


    const signOut = () => {
        API.post('/logout').then(() => {
            window.location.replace('/signin');
        });

    }
    useEffect(() => {
        API.get(`/user`).then((response) => {
            setCoins(response.data.coins);
            setLevel(response.data.exp);
            setIsAdmin(response.data.is_admin);
            API.get(`/user/${response.data.id}/incomingfriends`).then((response) => {
                setIncomingFriends(response.data);
            })
        })
    }, [refresh])

    const friends = Object.keys(incomingFriends).map((user) => (
        <div className="w-full flex-col mt-2">
            <h1 className="text-white font-SF-Pro mb-2 font-medium">Friend request</h1>
            <div className="flex gap-3 mb-3">
                <div className="rounded-full min-w-10 h-10 xl:min-w-12 xl:h-12 bg-center bg-cover" style={{ backgroundImage: `url(/images/tempprofilepic.png)` }}></div>
                <div className="flex flex-col w-4/5">
                    <h1 className="font-bold font-SF-Pro text-white xl:text-xl">{incomingFriends[user].username}</h1>
                    <h5 className="text-xs xl:text-sm font-SF-Pro text-white">LVL {Math.floor(incomingFriends[user].exp / 100)}</h5>
                </div>
            </div>
            <div className="flex gap-3 place-content-around text-white font-SF-Pro font-medium">
                <button onClick={() => acceptFriendRequest(incomingFriends[user].friendshipId)} className="bg-purple-interact text-sm xl:text-base px-5 rounded-sm py-1 hover:text-black hover:bg-action-hover transition-all">Accept</button>
                <button onClick={() => declineFriendRequest(incomingFriends[user].friendshipId)} className="bg-purple-interact text-sm xl:text-base px-5 rounded-sm py-1 hover:text-black hover:bg-action-hover transition-all">Decline</button>
            </div>
        </div>
    ))

    function acceptFriendRequest(id) {
        API.post(`friendshipaccept/${id}`).then((response) => {
            console.log(response.data);
            setRefresh(refresh + 1);
        }).catch((error) => {
            console.log(error);
        })
    }

    function declineFriendRequest(id) {
        API.post(`friendshipdecline/${id}`).then((response) => {
            console.log(response.data);
            setRefresh(refresh + 1);
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <div className="flex flex-col shadow-lg sticky top-0 z-20">
            <div className="flex bg-black-container w-full h-12 lg:h-20 justify-between px-6">
                <div className="flex h-full gap-6 items-center text-2xl xl:text-3xl">
                    <a href="/"><i className="fa-solid fa-house hover:text-action-hover transition-all"></i></a>
                    <a href="/friends"><i className="fa-solid fa-cat hover:text-action-hover transition-all"></i></a>
                    <a href="/"><i className="fa-solid fa-shirt hover:text-action-hover transition-all"></i></a>
                    <a href="/store"><i className="fa-solid fa-bag-shopping hover:text-action-hover transition-all"></i></a>
                    <a href="/"><i className="fa-solid fa-gamepad hidden xl:block  hover:text-action-hover transition-all"></i></a>
                    {isAdmin && <a href="/adminpanel"><i className="fa-solid fa-star hover:text-action-hover transition-all"></i></a>}
                </div>
                {coins && <div className="flex h-full gap-6 items-center">

                    <div className="lg:flex flex-col h-full place-content-center hidden">

                        <div className="flex w-full justify-between text-white font-SF-Pro text-lg font-bold">
                            <div className="my-auto me-4 w-40 bg-white h-2">
                                {level && <div style={{ width: `${((level / 100) - Math.floor(level / 100)) * 100}%` }} className="bg-purple-interact h-full"></div>}
                            </div>
                            {level && <span>LVL {Math.floor(level / 100)}</span>}
                        </div>
                        <div className="items-center flex w-full justify-end text-white font-SF-Pro text-lg font-bold">
                            <img src="/images/paw.png" className="w-4 h-4 me-2" />
                            <span>{coins}</span>
                        </div>
                    </div>
                    <div className="flex">
                        <i onClick={() => menuDropdown ? setMenuDropdown(false) : setMenuDropdown(true)} className="fa-solid fa-bars text-3xl hover:text-action-hover hover:cursor-pointer transition-all">
                            {incomingFriends.length > 0 && <svg className="absolute" height="10" width="35">
                                <circle r="5" cx="30" cy="5" fill="red" />
                            </svg>}
                        </i>

                    </div>


                </div>}
            </div>
            {menuDropdown && <div className="w-56 h-content mt-12 xl:mt-20 bg-black-container absolute place-self-end p-4 xl:p-3">
                <div className="lg:hidden flex flex-col h-full mb-4 place-content-center">

                    <div className="flex flex-col w-full text-white font-SF-Pro text-lg font-bold">
                        <div className="w-full bg-white h-2">
                            {level && <div style={{ width: `${((level / 100) - Math.floor(level / 100)) * 100}%` }} className="bg-purple-interact h-full"></div>}
                        </div>
                        <div className="flex w-full justify-between">
                            {level && <span>LVL {Math.floor(level / 100)}</span>}
                            <div className="items-center flex text-white font-SF-Pro text-lg font-bold">
                                <img src="/images/paw.png" className="w-4 h-4 me-2" />
                                <span>{coins}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <ul className="flex flex-col text-white text-xl xl:text-2xl font-SF-Pro mb-2">
                    <li><button onClick={() => { window.location.replace('/editprofile') }} className="hover:text-purple-interact">Edit Profile</button></li>
                    <hr className="my-1 border-purple-interact" />
                    <li><button onClick={signOut} className="hover:text-purple-interact">Sign out</button></li>
                    <hr className="my-1 border-purple-interact" />
                </ul>

                {friends}
            </div>}
            {notificationDropdown && <div className="p-3 w-56 h-64 mt-20 me-56 bg-black-container absolute flex flex-col gap-1 place-self-end">

            </div>}
        </div>
    );
}

export default Navbar