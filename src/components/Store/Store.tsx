import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import API from "../../axiosApi";

const Store = () => {
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchResults, setSearchResults] = useState({});
    const [items, setItems] = useState([]);
    const [statusCode, setStatusCode] = useState(0);

    const [filter, setFilter] = useState({ type: null, minPrice: null, maxPrice: null, color: null, order: null })

    const [refresh, setRefresh] = useState(0);

    const getItems = () => {
        setRefresh(0);
        API.get('/items', { params: { filter: filter } }).then((response) => {
            console.log(response);
            setItems(response.data);
            setStatusCode(response.status);
        })
    }

    useEffect(() => {
        getItems();
    }, [refresh])

    const search = (e) => {
        console.log(filter);
        e.preventDefault();
        API.get(`/search/items`, { params: { term: searchTerm } }).then((response) => {
            setItems(response.data);
            setStatusCode(response.status);

        })
    }

    const displayPosts = () => {
        const itemList = Object.keys(items).map((item, i) => (
            <div key={i} onClick={() => window.location.assign(`/item/${items[item].id}`)} className="flex hover:cursor-pointer group transition-all flex-col gap-2 w-48 h-72  bg-black-background p-2">
                <div className="rounded-sm bg-black-container h-2/3 items-center justify-center">
                    <img className="rounded-sm h-full mx-auto" src={`http://localhost:8000/storage/${items[item].image}`}></img>
                </div>
                <div className="rounded-sm bg-black-container flex items-center justify-center px-2 grow">
                    <h1 className="font-SF-Pro font-semibold text-white">{items[item].title}</h1>
                </div>
                <div className="group-hover:bg-black-container rounded-sm flex bg-purple-interact justify-between h-10 py-1 px-2 transition-all group-hover:px-6 select-none">
                    <div className="flex items-center justify-center bg-white  g-white group-hover:bg-black-container rounded-full w-8">
                        <img src="/images/paw.png" className="w-5 h-5" />
                    </div>
                    <span className="text-white font-SF-Pro font-bold text-2xl">{items[item].price}</span>
                </div>
            </div>
        ))
        return itemList;
    }

    return (
        <div className="w-full h-screen bg-black-background">
            <div className="w-full xl:w-3/4 h-full mx-auto">
                <Navbar />
                <div className="flex flex-col p-6 mt-1 min-h-full bg-black-container gap-6 xl:gap-12">
                    <h1 className="text-white text-2xl xl:text-4xl font-SF-Pro font-medium">Treat your cat!</h1>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center gap-4">
                        <div className="flex">
                            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="xl:text-3xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Search for item..." type="text"></input>
                            <button onClick={search} className="font-SF-Pro text-white xl:text-2xl px-6 border-black-background border-2 hover:bg-purple-interact">Search</button>
                        </div>
                        <div className="flex xl:flex-row flex-col gap-6 xl:gap-12">
                            <select name="type" onChange={(e) => { setFilter({ ...filter, type: e.target.value }); setRefresh(1) }} className="bg-black-background rounded font-semibold text-white font-SF-Pro text-lg py-2 px-4">
                                <option value={null}>Type</option>
                                <option value="hat">Hat</option>
                                <option value="clothing">Clothing</option>
                            </select>
                            <div className="font-semibold text-white font-SF-Pro text-lg flex gap-4 place-items-center">
                                <input  value={filter.minPrice} onChange={(e) => { setFilter({ ...filter, minPrice: e.target.valueAsNumber }); }} onBlur={() => setRefresh(1)} type="number" placeholder="Price min" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded bg-black-background w-32  py-2 px-4 text-center" />
                                <p>to</p>
                                <input  value={filter.maxPrice} onChange={(e) => { setFilter({ ...filter, maxPrice: e.target.valueAsNumber }); }} onBlur={() => setRefresh(1)} type="number" placeholder="Price max" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded bg-black-background w-32 py-2 px-4 text-center" />
                            </div>
                            <select onChange={(e) => { setFilter({ ...filter, color: e.target.value }); setRefresh(1) }} name="color" className="bg-black-background rounded font-semibold text-white font-SF-Pro text-lg py-2 px-4">
                                <option value={null}>Color</option>
                                <option value="red">Red</option>
                                <option value="black">Black</option>
                                <option value="yellow">Yellow</option>
                                <option value="purple">Purple</option>
                                <option value="white">White</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={(e) => { setFilter({ ...filter, order: e.target.value }); setRefresh(1) }} name="order" className="bg-black-background rounded font-semibold text-white font-SF-Pro text-lg py-2 px-4">
                                <option value={null}>Order</option>
                                <option value="AZ">A-Z</option>
                                <option value="ZA">Z-A</option>
                                <option value="priceAsc">Cheapest first</option>
                                <option value="priceDesc">Expensive first</option>
                            </select>
                        </div>
                    </form>
                    {items.length == 0 && statusCode !=200 && <div className='flex space-x-3 mt-6 justify-center items-center'>
                        <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-3 w-3 bg-purple-interact rounded-full animate-bounce'></div>
                    </div>}
                    {items.length == 0 && statusCode == 200 && <h1 className="font-SF-Pro text-white text-2xl place-self-center">No items match the selected criteria.</h1>}
                    <div className="grid xl:grid-cols-5 place-items-center px-12 gap-12 mx-12">
                        {displayPosts()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Store;