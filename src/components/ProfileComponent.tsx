import { useParams } from "react-router-dom";
import API from "../axiosApi";
import { useState } from "react";

const ProfileComponent = ({ username, level, isOwn }: { username: string, level: number, isOwn: boolean }) => {
    const { id } = useParams();
    const [message, setMessage] = useState("");

    const sendFriendRequest = (e) => {
        e.preventDefault();
        API.get(`/user`).then((response) => {
            console.log("user response" + response);
            API.post('/addfriend', { user_id_1: response.data.id, user_id_2: id, status: 'pending' }).then((response) => {
                console.log(response.data);
                setMessage("Friend request sent!");
            }).catch((error) => {
                if (error.message == 'Request failed with status code 500') {
                    setMessage("Friend request has already been sent!");
                } else {
                    setMessage("Error.. :(");
                };

            })

        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="w-full mt-1">
            <div className="bg-indigo-500 w-full h-48 lg:h-96"></div>
            <div className="flex justify-between relative bg-black-container w-full lg:h-40 h-20 mt-1 px-5">
                <div className="flex lg:gap-10 gap-2">
                    <div className="relative rounded-full bottom-3/4 lg:bottom-[120%] bg-pink-300 lg:w-80 lg:h-80 w-32 h-32"></div>
                    <div className="flex flex-col lg:gap-1 place-content-center w-auto">
                        <h1 className="text-lg lg:text-5xl font-bold font-SF-Pro text-white">{username}</h1>
                        <h1 className="text-sm lg:text-2xl font-SF-Pro text-white">LVL {Math.floor(level / 100)}</h1>
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full bg-green-400 lg:w-3 lg:h-3 w-2 h-2"></div>
                            <span className="text-sm lg:text-2xl font-SF-Pro text-white">Active - playing game</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex content-start gap-5 mt-6">
                        {!isOwn && <button className="h-8 w-32 hidden lg:block bg-purple-interact text-xl font-bold font-SF-Pro text-white hover:bg-action-hover hover:text-black transition-all">Message</button>}
                        {!isOwn && <button onClick={sendFriendRequest} className="h-8 w-32 hidden lg:block bg-purple-interact text-xl font-bold font-SF-Pro text-white hover:bg-action-hover hover:text-black transition-all">Friend</button>}
                        <a className="flex items-center h-8 w-3"><i className="mx-auto fa-solid fa-lg fa-ellipsis-vertical hover:text-action-hover transition-all"></i></a>

                    </div>
                    <h1 className="max-w-64 text-lg text-center mt-2 font-SF-Pro text-white">{message}</h1>
                </div>
            </div>
        </div>
    );
}

export default ProfileComponent