import { useEffect, useState } from "react"
import API from "../../axiosApi"
import UploadComponent from "../UploadComponent";
import PostComponent from "./PostComponent";
import { useParams } from "react-router-dom";

const ProfileFeedComponent = ({posts, friendships, userId, noPosts, message, pageId}) => {

    const [showUploadContainer, setShowUploadContainer] = useState(false);
    
    const displayPosts = () => {
        const results = Object.keys(posts).map((post, i) => (
            <PostComponent key={i} user_id={posts[post].user_id} username={posts[post].username} description={posts[post].description} created_at={posts[post].created_at} id={posts[post].id} title={posts[post].title} likes={posts[post].likes_count} media={posts[post].media} isOwn={((!pageId) || (pageId == userId))} />
        ))
        return results;
    }

    function listFriends() {
        const friends = Object.keys(friendships).map((user) => (
            <div className="flex gap-3 pb-3 pt-3 border-black-container border-b">
                <div className="rounded-full xl:min-w-12 xl:h-12 h-10 min-w-10 bg-center bg-cover" style={{ backgroundImage: `url(/images/tempprofilepic.png)` }}></div>
                <div className="flex flex-col w-full xl:w-4/5">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold font-SF-Pro text-white xl:text-xl"><a href={`/users/${friendships[user].id}`}>{friendships[user].username}</a></h1>
                        <button><i className=" px-3 fa-solid fa-ellipsis-vertical hover:text-action-hover transition-all"></i></button>

                    </div>
                    <h5 className="text-xs xl:text-sm font-SF-Pro text-white">LVL {Math.floor(friendships[user].exp / 100)}</h5>
                </div>

            </div>

        ))
        return friends;
    }

    return (
        <div className="flex flex-col gap-4 xl:flex-row w-full bg-black-container min-h-full xl:justify-between px-8">
            {showUploadContainer && <UploadComponent id={userId} onClose={() => setShowUploadContainer(false)} />}

            <div className="flex flex-col w-full">
                <h1 className="font-bold font-SF-Pro text-white text-2xl xl:text-5xl mb-4 w-full">Posts</h1>
                <div className="w-full flex flex-col xl:block">
                    {(!pageId || pageId == userId) && <button onClick={() => setShowUploadContainer(true)} className="font-bold font-SF-Pro text-white xl:text-2xl p-2 px-12 bg-black-background transition-all hover:bg-purple-interact">Create post +</button>}

                    <div className="xl:mt-6 mt-4 flex flex-col gap-6 w-full">
                        {posts.length == 0 && noPosts.length == 0 && <div className='flex space-x-3 justify-center items-center'>
                            <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                            <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                            <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce'></div>
                        </div>}
                        {posts && displayPosts()}
                        {posts.length == 0 && <h1 className="font-medium font-SF-Pro text-white text-lg ms-4">{noPosts}</h1>}
                    </div>


                </div>
            </div>
            <div className="flex flex-col items-end">

                <div className="flex flex-col xl:w-72 w-full gap-6">

                    <div className="flex flex-col bg-black-background w-full h-content p-4">

                        <h1 className="font-bold font-SF-Pro text-white text-2xl xl:text-5xl mb-1">Friends</h1>

                        {listFriends()}
                        <h1 className=" text-sm font-SF-Pro text-white">{message}</h1>
                        {friendships.length < 1 && message.length < 1 &&
                            <div className='flex space-x-3 justify-center items-center'>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce'></div>
                            </div>
                        }

                    </div>
                    <button className="font-bold font-SF-Pro text-white xl:text-4xl bg-black-background w-full h-auto p-2 xl:p-4 text-center hover:bg-purple-interact transition-all">
                        Inventory
                    </button>
                    <button className="font-bold font-SF-Pro mb-24 text-white xl:text-4xl bg-black-background w-full h-auto p-2 xl:p-4 text-center hover:bg-purple-interact transition-all">
                        Trade
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileFeedComponent;