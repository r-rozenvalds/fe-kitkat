import { useState } from "react";
import API from "../axiosApi";

const UploadCoverComponent = ({onClose, id}) => {
    const [message, setMessage] = useState(null);
    const [file, setFile] = useState(null);

    const upload = (e) => {
        e.preventDefault();
        setMessage("Uploading...")
        console.log(file)
        API.post(`user/${id}/update`, {
            cover_photo: file,
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
                    <h1 className="text-white font-SF-Pro font-bold text-2xl xl:text-5xl">Change cover photo</h1>
                    <button onClick={onClose}><i className="fa-solid hover:text-action-hover transition-all fa-xmark fa-2x"></i></button>
                </div>
                <form className="flex flex-col gap-1">
                    <label className="text-white font-SF-Pro font-bold xl:text-xl">Upload file</label>
                    
                    <input autoFocus name="upload" onChange={(e) => setFile(e.target.files[0])} className="p-2 xl:text-lg font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" type="file" />
                    <label className="text-white text-sm xl:text-base text-opacity-40 font-SF-Pro font-semibold">Only .jpg, .png and .jpeg</label>
                    <label className="text-white text-sm xl:text-base text-opacity-40 font-SF-Pro font-semibold">Max file size 20mb</label>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2 items-center w-2/3">
                            <h1 className="text-white font-SF-Pro font-bold text-xl">{message}</h1>
                            {message==="Uploading..." && <div className='flex space-x-3 justify-center items-center'>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce'></div>
                            </div>}
                        </div>
                        <button disabled={message === "Successfully uploaded!"} onClick={upload} className="p-2 hover:bg-purple-interact transition-all w-2/3 xl:w-1/3 text-2xl font-bold font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none disabled:hover:bg-black-container disabled:text-zinc-700 disabled:hover:cursor-not-allowed">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadCoverComponent;