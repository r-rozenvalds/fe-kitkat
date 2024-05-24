import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import ProfileComponent from "./ProfileComponent";
import ProfileFeedComponent from "./ProfilePostsComponent";
import API from "../axiosApi";
import { useState } from "react";


const UserProfile = () => {
    const {id} = useParams();
    const [username, setUsername] = useState();
    const [level, setLevel] = useState();

    API.get(`/users/${id}`).then((response) => {
        console.log(response);
        setLevel(response.data.data.exp);
        setUsername(response.data.data.username);
        
    }).catch((error) => {
        console.log("id is" + id)
        console.log(error);
    })

    return (
        <div className="w-full h-screen bg-black-background overflow-auto">
            <div className=" w-3/4 h-full mx-auto">
                <Navbar />
                <ProfileComponent username={username} level={level} isOwn={false}/>
                <ProfileFeedComponent id={id}/>
            </div>
        </div>
    )
}

export default UserProfile;