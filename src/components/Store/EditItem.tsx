import { useEffect, useState } from "react";
import API from "../../axiosApi";

const EditItem = ({ onClose, item }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        API.get(`/item/${item}`).then((response) => {
            console.log(response.data);
            setTitle(response.data.data.title);
            setDescription(response.data.data.description);
            setPrice(response.data.data.price);
            setColor(response.data.data.color);
            setType(response.data.data.type);
        })
    }, [])

    const upload = (e) => {
        e.preventDefault();
        setMessage("Uploading...")
        API.post(`/item/${item}/update`, {
            title: title,
            description: description,
            color: color,
            price: price,
            type: type,
            image: file,
        }).then(() => {
            setMessage("Successfully uploaded!");
        }).catch((error) => {
            console.log(error);
            setMessage("Error, check console.");
        })
    }
    return (
        <div className="flex glass w-full h-full z-30 fixed left-0 top-0 items-center">
            <div className="bg-black-background w-2/5 h-content mx-auto p-6 flex flex-col gap-3">
                <div className="flex justify-between">
                    <h1 className="text-white font-SF-Pro font-bold text-5xl">Update item</h1>
                    <button onClick={onClose}><i className="fa-solid hover:text-action-hover transition-all fa-xmark fa-2x"></i></button>
                </div>
                <form onSubmit={upload} className="flex flex-col gap-2">
                    <label className="text-white font-SF-Pro font-bold text-xl">Item title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={48} className="p-2 text-2xl font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" type="text" />
                    <label className="text-white font-SF-Pro font-bold text-xl">Item type</label>
                    <div className="flex w-full items-center justify-around accent-purple-interact">
                        <div className="flex gap-6">
                            <label className="text-white font-SF-Pro font-bold">Hat</label>
                            <input checked={type == "hat"} name="item-type" value="hat" onChange={(e) => setType(e.target.value)} className="w-5" type="radio" />
                        </div>
                        <div className="flex gap-6">
                            <input checked={type == "clothing"} name="item-type" value="clothing" onChange={(e) => setType(e.target.value)} className="w-5" type="radio" />
                            <label className="text-white font-SF-Pro font-bold">Clothes</label>
                        </div>
                    </div>
                    <label className="text-white font-SF-Pro font-bold text-xl">Item description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={256} className="resize-none h-48 p-2 text-2xl font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" />
                    <div className="flex w-full">
                        <div className="flex flex-col w-2/3 gap-2">
                            <label className="text-white font-SF-Pro font-bold text-xl">Item price</label>
                            <input value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 text-lg font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" type="number" />
                        </div>
                        <div className="flex flex-col w-1/3 gap-2">
                            <label className="text-white font-SF-Pro font-bold text-xl">Item color</label>
                            <input value={color} onChange={(e) => setColor(e.target.value)} className="w-full p-2 text-lg font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" type="text" />
                        </div>
                    </div>
                    <label className="text-white font-SF-Pro font-bold text-xl">Item image</label>
                    <input name="upload" onChange={(e) => setFile(e.target.files[0])} className="p-2 text-lg font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" type="file" />

                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2 items-center w-2/3">
                            <h1 className="text-white font-SF-Pro font-bold text-xl">{message}</h1>
                            {message === "Uploading..." && <div className='flex space-x-3 justify-center items-center'>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce'></div>
                            </div>}
                        </div>
                        <button disabled={message === "Successfully uploaded!"} onClick={upload} className="p-2 hover:bg-purple-interact transition-all  w-1/3 text-2xl font-bold font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none disabled:hover:bg-black-container disabled:text-zinc-700 disabled:hover:cursor-not-allowed">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}




export default EditItem;