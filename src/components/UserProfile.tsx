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
        setLevel(response.data[0].exp);
        setUsername(response.data[0].username);
        
    }).catch((error) => {
        console.log("id is" + id)
        console.log(error);
    })

    return (
        <div className="w-full h-screen bg-black-background overflow-hidden">
            <div className=" w-3/4 h-full mx-auto">
                <Navbar />
                <ProfileComponent username={username} level={level}/>
                <ProfileFeedComponent/>
            </div>
        </div>
    )
}

export default UserProfile;