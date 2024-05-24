import { useState } from "react";

const PostComponent = () => {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="flex gap-4">
            <div className="bg-black-background xl:w-[42rem] xl:h-[32rem] w-full h-[16rem] flex">
                <div className="ms-3 xl:ms-6 xl:mt-4 h-10 flex items-center w-full ">
                    <h1 className="text-white font-SF-Pro font-semibold text-lg xl:text-2xl">Video title</h1>
                </div>
                <div className="h-10 xl:h-20 place-self-end flex items-center gap-3 xl:gap-6 place-content-end w-full">
                    <button className="h-10 w-10 xl:h-20 xl:w-20"><i className="fa-solid fa-paw text-2xl xl:text-3xl shadow-sm" style={{ color: "white" }}></i></button>
                    <button onClick={() => showComments ? setShowComments(false) : setShowComments(true)} className="h-10 w-10 xl:h-20 xl:w-20 me-2"><i className="fa-solid fa-comment text-2xl xl:text-3xl shadow-sm" style={{ color: "white" }}></i></button>
                </div>
            </div>
            {showComments && <div className="flex flex-col w-72 h-[28rem]">
                <div className="flex flex-col bg-black-background w-full h-auto p-4">
                    <h1 className="font-bold font-SF-Pro text-white text-3xl">Comments</h1>
                </div>
                <div className="flex flex-col bg-black-background w-full h-96 p-4 gap-3">
                    <div className="flex gap-3">
                        <div className="rounded-full w-12 h-12 bg-pink-300"></div>
                        <div className="flex flex-col w-4/5">
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold font-SF-Pro text-white text-xl">User101</h1>
                                <button><i className=" px-3 fa-solid fa-ellipsis-vertical hover:text-action-hover transition-all"></i></button>

                            </div>
                            <h5 className=" text-sm font-SF-Pro text-white">Hello, this is a comment. bla bla bla.. I really think this is something else. Wow. lmao.</h5>
                        </div>

                    </div>
                    <hr className="border-black-container" />

                </div>
            </div>}
        </div>
    );
}

export default PostComponent;