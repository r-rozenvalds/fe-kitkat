import Navbar from "./Navbar"
import ProfileComponent from "./ProfileComponent"
import ProfileFeedComponent from "./ProfilePostsComponent"
import { useEffect, useState } from "react"
import API from "../axiosApi"

const Home = () => {
    const [isAdmin, setIsAdmin] = useState();
    const [level, setLevel] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        API.get(`/user`).then((response) => {
            console.log(response);
            setLevel(response.data.exp);
            setUsername(response.data.username);
            setIsAdmin(response.data.is_admin);
        })
    }, [])

    return (
        <div className="bg-black-background">
            <div className="mx-auto lg:w-3/4">
                <Navbar/>
                <ProfileComponent username={username} level={level}/>
                <ProfileFeedComponent />
            </div>
        </div>
    )
}


export default Home;