import { useState } from "react";
import API from "../axiosApi";

const UploadComponent = ({ id, onClose }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);


    const upload = (e) => {
        e.preventDefault();
        setMessage("Uploading...")
        console.log(file)
        API.post(`user/${id}/post`, {
            title: title,
            description: description,
            user_id: id,
            upload: file,
        }).then(() => {
            setMessage("Successfully uploaded!");
            setTimeout(function() {
                onClose();
                window.location.reload();
            }, 1000)
        }).catch((error) => {
            console.log(error);
            setMessage("Error, check console.");
        })
    }
    return (
        <div className="flex glass w-full h-full z-20 fixed left-0 top-0 items-center">
            <div className="bg-black-background w-full xl:w-2/5 h-content mx-auto p-6 flex flex-col gap-3">
                <div className="flex justify-between">
                    <h1 className="text-white font-SF-Pro font-bold text-3xl xl:text-5xl">What's up?</h1>
                    <button onClick={onClose}><i className="fa-solid hover:text-action-hover transition-all fa-xmark fa-2x"></i></button>
                </div>
                <form className="flex flex-col gap-2">
                    <label className="text-white font-SF-Pro font-bold text-xl">Post title</label>
                    <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} maxLength={48} className="p-2 text-2xl font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" type="text" />
                    <label className="text-white font-SF-Pro font-bold text-xl">Post description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={256} className="resize-none h-56 p-2 text-2xl font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" />
                    <input name="upload" onChange={(e) => setFile(e.target.files[0])} className="p-2 text-lg font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" type="file" />
                    <label className="text-white text-opacity-40 font-SF-Pro font-semibold">Only .jpg, .png, .gif, .jpeg, .webp, .mp4, .webm, .mov, .avi, .wmv</label>
                    <label className="text-white text-opacity-40 font-SF-Pro font-semibold">Max file size 100mb</label>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2 items-center w-2/3">
                            <h1 className="text-white font-SF-Pro font-bold xl:text-xl">{message}</h1>
                            {message==="Uploading..." && <div className='flex space-x-3 justify-center items-center'>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce'></div>
                            </div>}
                        </div>
                        <button disabled={message === "Successfully uploaded!"} onClick={upload} className="p-2 hover:bg-purple-interact transition-all w-2/3 xl:w-1/3 text-2xl font-bold font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none disabled:hover:bg-black-container disabled:text-zinc-700 disabled:hover:cursor-not-allowed">Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}



export default UploadComponent;