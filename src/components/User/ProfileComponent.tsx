import { useParams } from "react-router-dom";
import API from "../../axiosApi";
import { useEffect, useState } from "react";
import UploadCoverComponent from "../UploadCoverComponent";

const ProfileComponent = ({ userId, pageId, username, level, isOnline, cover_photo }) => {

    const [message, setMessage] = useState("");
    const [showCoverUpload, setShowCoverUpload] = useState(false);


    const sendFriendRequest = (e) => {
        e.preventDefault();
        API.post('/addfriend', { user_id_1: userId, user_id_2: pageId, status: 'pending' }).then((response) => {
            console.log(response.data);
            setMessage("Friend request sent!");
        }).catch((error) => {
            if (error.message == 'Request failed with status code 500') {
                setMessage("Friend request has already been sent!");
            } else {
                setMessage("Error.. :(");
            };

        }).catch((error) => {
            console.log(error);
        })
    }







    return (
        <div onClick={() => console.log(cover_photo)} className="w-full mt-1">
            {showCoverUpload && <UploadCoverComponent id={userId} onClose={() => setShowCoverUpload(false)} />}
            {cover_photo!='none' && <div style={{ backgroundImage: `url(http://localhost:8000/storage/${cover_photo})` }}
                className='bg-black-container flex bg-no-repeat bg-cover bg-center place-content-end items-end p-4 w-full h-48 lg:h-96'>
                {((!pageId) || (pageId == userId)) && <button onClick={() => setShowCoverUpload(true)} className="rounded-lg bg-black hover:bg-opacity-60 transition-all bg-opacity-40 w-10 h-10"><i className="fa-solid text-2xl fa-image"></i></button>}
            </div>}
            {cover_photo=='none' && <div
                className='bg-indigo-500 flex bg-no-repeat bg-cover bg-center place-content-end items-end p-4 w-full h-48 lg:h-96'>
                {((!pageId) || (pageId == userId)) && <button onClick={() => setShowCoverUpload(true)} className="rounded-lg bg-black hover:bg-opacity-60 transition-all bg-opacity-40 w-10 h-10"><i className="fa-solid text-2xl fa-image"></i></button>}
            </div>}
            <div className="flex justify-between relative bg-black-container w-full lg:h-40 h-20 mt-1 px-5">
                <div className="flex lg:gap-10 gap-2">
                    <div style={{ backgroundImage: `url(/images/tempprofilepic.png)` }} className={`relative bg-center bg-cover rounded-full bottom-3/4 lg:bottom-[120%] lg:w-80 lg:h-80 w-32 h-32`}>
                        
                    </div>
                    <div className="flex flex-col lg:gap-1 place-content-center w-auto">
                        <h1 className="text-lg lg:text-5xl font-bold font-SF-Pro text-white">{username}</h1>
                        <h1 className="text-sm lg:text-2xl font-SF-Pro text-white">LVL {Math.floor(level / 100)}</h1>
                        <div className="flex gap-2 items-center">
                            {isOnline && <div className="rounded-full bg-green-400 lg:w-3 lg:h-3 w-2 h-2"></div>}
                            {!isOnline && <div className="rounded-full bg-zinc-500 lg:w-3 lg:h-3 w-2 h-2"></div>}
                            <span className="text-sm lg:text-2xl font-SF-Pro text-white">{isOnline ? "Online" : "Offline"}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex content-start gap-5 mt-6">
                        {(pageId && pageId != userId) && <button className="h-8 xl:w-32 w-24 hidden bg-purple-interact text-sm xl:text-xl font-bold font-SF-Pro text-white hover:bg-action-hover hover:text-black transition-all">Message</button>}
                        {(pageId && pageId != userId) && <button onClick={sendFriendRequest} className="h-8 xl:w-32 w-24 bg-purple-interact text-sm xl:text-xl font-bold font-SF-Pro text-white hover:bg-action-hover hover:text-black transition-all">Friend</button>}
                        <a className="flex items-center h-8 w-3"><i className="mx-auto fa-solid fa-lg fa-ellipsis-vertical hover:text-action-hover transition-all"></i></a>

                    </div>
                    <h1 className="xl:max-w-64 max-w-32 text-sm xl:text-lg text-center mt-2 font-SF-Pro text-white">{message}</h1>
                </div>
            </div>
        </div>
    );
}

export default ProfileComponent