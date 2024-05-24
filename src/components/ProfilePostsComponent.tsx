import { useEffect, useState } from "react"
import API from "../axiosApi"
import UploadComponent from "./UploadComponent";
import PostComponent from "./PostComponent";

const ProfileFeedComponent = ({ id }) => {

    const [friendships, setFriendships] = useState([]);
    const [message, setMessage] = useState("");
    const [showUploadContainer, setShowUploadContainer] = useState(false);

    useEffect(() => {
        API.get(`user/${id}/friends`).then((response) => {
            if (response.data.length > 0) {
                setFriendships(response.data);
            } else {
                setMessage("Don't fear, friends will soon be near!")
            }
        })


    }, [])

    function listFriends() {
        const friends = Object.keys(friendships).map((user) => (
            <div className="flex gap-3 pb-3 pt-3 border-black-container border-b">
                <div className="rounded-full w-12 h-12 bg-pink-300"></div>
                <div className="flex flex-col w-4/5">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold font-SF-Pro text-white text-xl"><a href={`/users/${friendships[user].id}`}>{friendships[user].username}</a></h1>
                        <button><i className=" px-3 fa-solid fa-ellipsis-vertical hover:text-action-hover transition-all"></i></button>

                    </div>
                    <h5 className=" text-sm font-SF-Pro text-white">LVL {Math.floor(friendships[user].exp / 100)}</h5>
                </div>

            </div>

        ))
        return friends;
    }

    return (
        <div className="flex w-full bg-black-container justify-between px-8">
            {showUploadContainer && <UploadComponent id={id} onClose={() => setShowUploadContainer(false)} />}

            <div className="flex flex-col xl:w-auto w-full">
                <h1 className="font-bold font-SF-Pro text-white xl:text-5xl text-3xl xl:mb-8 mb-4">Posts</h1>
                <div className="w-full">
                    <button onClick={() => setShowUploadContainer(true)} className="font-bold font-SF-Pro text-white text-2xl p-2 px-12 bg-black-background transition-all hover:bg-purple-interact">Create post +</button>

                    <div className="mt-6 flex flex-col">
                        <PostComponent />
                    </div>


                </div>
            </div>
            <div className="flex flex-col w-auto items-end">

                <div className="xl:flex hidden flex-col w-full gap-6">

                    <div className="flex flex-col bg-black-background w-80 h-content p-4">

                        <h1 className="font-bold font-SF-Pro text-white text-5xl mb-1">Friends</h1>

                        {listFriends()}
                        <h1 className=" text-sm font-SF-Pro text-white">{message}</h1>
                        {friendships.length < 1 && message.length < 1 &&
                            <div className='flex space-x-3 justify-center items-center'>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce'></div>
                            </div>
                        }
                        {/* <div className="border-white self-center h-10 w-10 animate-spin rounded-full border-4 border-t-purple-interact" /> */}

                    </div>
                    <button className="font-bold font-SF-Pro text-white text-4xl bg-black-background w-80 h-auto p-4 text-center hover:bg-purple-interact transition-all">
                        Inventory
                    </button>
                    <button className="font-bold font-SF-Pro text-white text-4xl bg-black-background w-80 h-auto p-4 text-center hover:bg-purple-interact transition-all">
                        Trade
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileFeedComponent;