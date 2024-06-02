import { useState } from "react";
import API from "../../axiosApi";
import Confirmation from "../Misc/Confirmation";

const PostComponent = ({ id, title, likes, media, isOwn, created_at, description, username, user_id }) => {
    const [showComments, setShowComments] = useState(false);
    const [menu, setMenu] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [postLikes, setPostLikes] = useState(likes);
    const [comment, setComment] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const deletePost = () => {
        setShowConfirmation(false);
        API.post(`posts/${id}/delete`).then((response) => {
            setIsDeleted(true);
            setMenu(false);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    const likePost = () => {
        API.get(`/user`).then((response) => {
            API.post(`posts/${id}/user/${response.data.id}/like`).then((response) => {
                if (response.data === 'liked') {
                    setPostLikes(postLikes + 1);
                } else {
                    setPostLikes(postLikes - 1);

                }
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    return (


        <div className="flex flex-col xl:flex-row w-full h-full">
            {showConfirmation && <Confirmation message="delete this post" onCancel={() => setShowConfirmation(false)} onConfirm={deletePost}/>}
            <div className="bg-black-background relative xl:w-[55%] flex rounded-lg">
                {isDeleted && <div className="w-full select-none h-full flex items-center bg-purple-400 absolute rounded-xl z-10 glass">
                    <h1 className="font-SF-Pro text-3xl text-white mx-auto font-bold">Post deleted.</h1>
                </div>}
                <div className="flex h-fit p-2 rounded-lg items-center mx-auto">
                    <img alt={`Post ${title} by user ${username}`} className="h-fit w-fit max-h-[40rem]" src={`http://localhost:8000/storage/${media}`} ></img>
                </div>
                <div className="rounded-lg px-6 py-4 justify-between flex-col absolute h-full w-full" style={{ textShadow: '0px 0px 10px black' } && { boxShadow: 'inset 0px 0px 60px black' }}>
                    <div className="flex flex-col">
                        <div className="flex items-start gap-4 justify-between w-full">
                            <div>
                            <h1 className="text-white font-SF-Pro font-semibold xl:text-2xl" style={{ textShadow: '0px 0px 10px black' }} >{title}</h1>
                            <a href={(`/users/${user_id}`)} className="text-white text-sm xl:text-base font-SF-Pro" style={{ textShadow: '0px 0px 10px black' }} >{username}</a>

                            </div>
                            <div className="flex gap-2">
                                <div className="flex gap-1">
                                    <h1 className=" text-white text-lg xl:text-3xl self-center select-none" style={{ textShadow: '0px 0px 10px black' }}>{postLikes}</h1>
                                    <button onClick={likePost} className="group transition-all px-2">
                                        <i className="group-hover:text-purple-interact fa-solid fa-paw group-hover:animate-bounce  text-xl xl:text-3xl text-white" style={{ textShadow: '0px 0px 10px black' }}></i>
                                    </button>
                                </div>
                                <button onClick={() => showComments ? setShowComments(false) : setShowComments(true)} className="p-2"><i className="fa-solid fa-comment text-xl xl:text-3xl text-white hover:text-purple-interact transition-all" style={{ textShadow: '0px 0px 10px black' }}></i></button>
                                <button onClick={() => menu ? setMenu(false) : setMenu(true)}><i className="px-2 xl:py-4 mx-auto fa-solid text-lg fa-ellipsis-vertical hover:text-purple-interact text-white transition-all" style={{ textShadow: '0px 0px 10px black' }}></i></button>
                            </div>

                        </div>
                        {menu && <div className="w-32 h-10 self-end shadow-md text-white font-SF-Pro font-bold z-10 items-center flex bg-black-container">
                            <ul className="mx-auto h-full w-full">
                                {isOwn && <li className="w-full h-full flex"><button onClick={() => setShowConfirmation(true)} className="place-items-center w-full h-full hover:bg-rose-500"><i className="text-white fa-solid fa-trash-can me-3"></i>Delete</button></li>}
                            </ul>
                        </div>}
                    </div>

                    <div className="flex items-center gap-3 place-content-end w-full">

                    </div>
                </div>
            </div>
            {showComments && <div className="flex rounded-lg bg-black-background p-4 gap-2 flex-col justify-between xl:w-[30%]">
                <div className="flex flex-col gap-2 h-full">
                    <div>
                    <p className="text-white font-SF-Pro font-semibold text-lg" style={{ textShadow: '0px 0px 10px black' }} >{created_at.substr(0, 10)}</p>
                    <p className="text-white font-SF-Pro" style={{ textShadow: '0px 0px 10px black' }}>{description} </p>

                    </div>
                    <h1 className="font-bold font-SF-Pro text-white text-lg xl:text-3xl">Comments</h1>
                    <div className='overflow-y-auto grow flex flex-col gap-3'>
                        <div className="flex gap-3">
                            <div className="rounded-full w-12 h-12 bg-cover bg-center" style={{ backgroundImage: `url(/images/tempprofilepic.png)` }}></div>
                            <div className="flex flex-col w-4/5">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold font-SF-Pro text-white xl:text-xl">User101</h1>
                                    <button><i className=" px-3 text-sm xl:text-base fa-solid fa-ellipsis-vertical hover:text-action-hover transition-all"></i></button>

                                </div>
                                <h5 className=" text-sm font-SF-Pro text-white">Hello, this is a comment. One two three</h5>
                            </div>

                        </div>
                        <hr className="border-black-container" />




                    </div>
                </div>
                <div className="flex flex-col">
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={256} className="resize-none w-full h-20 p-2 text-sm font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" />
                    <button className="py-1 hover:bg-purple-interact transition-all xl:text-lg font-bold font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none disabled:hover:bg-black-container disabled:text-zinc-700 disabled:hover:cursor-not-allowed">Comment</button>

                </div>
            </div>}
        </div>

    );
}

export default PostComponent;