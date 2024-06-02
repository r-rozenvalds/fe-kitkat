
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import ProfileComponent from "./ProfileComponent";
import ProfileFeedComponent from "./ProfilePostsComponent";
import API from "../../axiosApi";
import { useParams } from "react-router-dom";



const UserProfile = () => {
    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [level, setLevel] = useState(1);
    const [userId, setUserId] = useState();
    const [posts, setPosts] = useState([]);
    const [friendships, setFriendships] = useState([]);
    const [message, setMessage] = useState("");
    const [noPosts, setNoPosts] = useState("");
    const [isOnline, setIsOnline] = useState(false);
    const [coverPhoto, setCoverPhoto] = useState(null);

    useEffect(() => {
        
        API.get(`/user`).then((response) => {
            setUserId(response.data.id);
            API.get(`/user/${(id === undefined ? response.data.id : id)}/updatestatus`).then((response) => {
                setIsOnline(response.data);
                
            })
            //if profile is being opened from / then use id from /user else use the link params id
            API.get(`/users/${(id === undefined ? response.data.id : id)}`).then((response) => {
                
                console.log(response);
                setLevel(response.data.data.exp);
                setUsername(response.data.data.username);
                setCoverPhoto(response.data.data.cover_photo);
            }).catch((error) => {
                console.log(error);
            })

            API.get(`user/${(id === undefined ? response.data.id : id)}/friends`).then((response) => {
                if (response.data.length > 0) {
                    setFriendships(response.data);
                } else {
                    setMessage("Don't fear, friends will soon be near!")
                }
            })

            API.get(`user/${(id === undefined ? response.data.id : id)}/posts`).then((response) => {
                setPosts(response.data);
                console.log(response.data);
                if (response.data.length === 0) {
                    setNoPosts("Nothing to see here.")
                }
            }).catch((error) => {
                console.log(error);
            })

        })
    }, [])


    return (
        <div className="w-full h-screen bg-black-background overflow-auto">
            {userId && <div className="xl:w-3/4 h-full mx-auto">
                <Navbar />
                <ProfileComponent cover_photo={coverPhoto} level={level} pageId={id} username={username} userId={userId} isOnline={isOnline} />
                <ProfileFeedComponent pageId={id} userId={userId} posts={posts} friendships={friendships} noPosts={noPosts} message={message}/>
            </div>}
        </div>
    )
}

export default UserProfile;