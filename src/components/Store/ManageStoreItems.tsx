import { useEffect, useState } from "react";
import API from "../../axiosApi";
import Confirmation from "../Misc/Confirmation";
import EditItem from "./EditItem";

const ManageStoreItems = ({ onClose }) => {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [filter, setFilter] = useState({ type: null, minPrice: null, maxPrice: null, color: null, order: null })

    useEffect(() => {
        setRefresh(0);
        API.get('/items', { params: { filter: filter } }).then((response) => {
            setItems(response.data);
        })
    }, [refresh])

    const deleteItem = () => {
        API.delete(`/items/${items[item].id}`).then((response) => {
            console.log(response);
            setRefresh(1);
        })
    }

    const displayPosts = () => {
        const itemList = Object.keys(items).map((item, i) => (
            <div key={i} className="flex group transition-all flex-col gap-2 w-48 h-72  bg-black-background p-2">

                <div className="rounded-sm bg-black-container h-2/5 h- items-center justify-center">
                    <img className="rounded-sm h-full mx-auto" src={`http://localhost:8000/storage/${items[item].image}`}></img>
                </div>
                <div className="rounded-sm bg-black-container flex flex-col items-center justify-center px-2 grow">
                    <h1 className="font-SF-Pro font-semibold text-white">{items[item].title}</h1>
                    <h1 className="font-SF-Pro text-white">Price: {items[item].price}</h1>
                </div>
                <div className="rounded-sm justify-center bg-black-container flex flex-col h-3/5 py-1 px-2 transition-all gap-2 select-none">
                    <button onClick={() => { setShowEdit(true); setItem(i) }} className="text-white rounded bg-purple-interact font-SF-Pro font-bold text-2xl">Edit</button>
                    <button onClick={() => { setShowConfirmation(true); setItem(i) }} className="text-white rounded bg-rose-400 font-SF-Pro font-bold text-2xl">Delete</button>
                </div>
            </div>
        ))
        return itemList;
    }

    const search = (e) => {
        e.preventDefault();
        API.get(`/search/items`, { params: { term: searchTerm } }).then((response) => {
            setItems(response.data);
        })
    }

    return (
        <div className="flex glass w-full h-screen z-30 fixed left-0 top-0 items-center">
            {showConfirmation && <Confirmation message={`delete ${items[item].title}`} onConfirm={() => { setShowConfirmation(false); deleteItem() }} onCancel={() => setShowConfirmation(false)} />}
            {showEdit && <EditItem onClose={() => setShowEdit(false)} item={items[item].id} />}
            <div className="bg-black-background w-full h-full xl:w-4/5 h-content mx-auto p-6 flex flex-col gap-6">
                <div className="flex justify-between">
                    <h1 className="text-white font-SF-Pro font-bold text-3xl xl:text-5xl">Manage store items</h1>
                    <button onClick={onClose}><i className="fa-solid hover:text-action-hover transition-all fa-xmark fa-2x"></i></button>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 items-center">
                    <div className="flex">
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-3xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Search for item..." type="text"></input>
                        <button onClick={search} className="font-SF-Pro bg-black-container text-white text-2xl px-6 border-black-background border-2 hover:bg-purple-interact">Search</button>
                    </div>
                    <div className="flex gap-12">
                        <select name="type" onChange={(e) => { setFilter({ ...filter, type: e.target.value }); setRefresh(1) }} className="bg-black-container rounded font-semibold text-white font-SF-Pro text-lg py-2 px-4">
                            <option value={null}>Type</option>
                            <option value="hat">Hat</option>
                            <option value="clothing">Clothing</option>
                        </select>
                        <div className="font-semibold text-white font-SF-Pro text-lg flex gap-4 place-items-center">
                            <input value={filter.minPrice} onChange={(e) => { setFilter({ ...filter, minPrice: e.target.valueAsNumber }); }} onBlur={() => setRefresh(1)} type="number" placeholder="Price min" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded bg-black-container w-32  py-2 px-4 text-center" />
                            <p>to</p>
                            <input value={filter.maxPrice} onChange={(e) => { setFilter({ ...filter, maxPrice: e.target.valueAsNumber }); }} onBlur={() => setRefresh(1)} type="number" placeholder="Price max" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded bg-black-container w-32 py-2 px-4 text-center" />
                        </div>
                        <select onChange={(e) => { setFilter({ ...filter, color: e.target.value }); setRefresh(1) }} name="color" className="bg-black-container rounded font-semibold text-white font-SF-Pro text-lg py-2 px-4">
                            <option value={null}>Color</option>
                            <option value="red">Red</option>
                            <option value="black">Black</option>
                            <option value="yellow">Yellow</option>
                            <option value="purple">Purple</option>
                            <option value="white">White</option>
                        </select>
                    </div>
                    <div>
                        <select onChange={(e) => { setFilter({ ...filter, order: e.target.value }); setRefresh(1) }} name="order" className="bg-black-container rounded font-semibold text-white font-SF-Pro text-lg py-2 px-4">
                            <option value={null}>Order</option>
                            <option value="AZ">A-Z</option>
                            <option value="ZA">Z-A</option>
                            <option value="priceAsc">Cheapest first</option>
                            <option value="priceDesc">Expensive first</option>
                        </select>
                    </div>
                </form>
                <div className=" h-full overflow-y-auto">
                    {items.length == 0 && <div className='flex space-x-3 mt-6 justify-center items-center'>
                        <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce'></div>
                    </div>}
                    <div className="grid grid-cols-4 place-items-center px-12 gap-12 mx-12 ">


                        {displayPosts()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageStoreItems;