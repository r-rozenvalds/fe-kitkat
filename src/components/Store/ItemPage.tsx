import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import API from "../../axiosApi";

const ItemPage = () => {

    const { id } = useParams();
    const [item, setItem] = useState(null);


    useEffect(() => {
        API.get(`/item/${id}`).then((response) => {
            setItem(response.data.data);
            console.log(response.data.data);
        }).catch((error) => {
            console.log(error.data);
        })
    }, [])

    return (
        <div className="w-full h-screen bg-black-background overflow-hidden">
            <div className=" xl:w-3/4 h-full mx-auto">
                <Navbar />
                {item && <div className="flex flex-col mt-1 xl:pt-16 bg-black-container h-full gap-2">

                    <div className="flex flex-col xl:flex-row gap-12 p-6">
                        <div className="xl:w-2/5 p-4 bg-black-background rounded-sm">
                            <img className="rounded-sm h-full mx-auto" src={`http://localhost:8000/storage/${item.image}`}></img>
                        </div>
                        <div className="flex flex-col xl:justify-between xl:gap-0 gap-8 xl:w-3/5">
                            <div className="flex flex-col gap-3">
                                <h1 className="text-white text-2xl xl:text-4xl font-SF-Pro font-bold">{item.title}</h1>
                                <p className="text-white text-sm xl:text-xl font-SF-Pro">{item.description}</p>
                                <p className="text-white text-sm xl:text-xl font-SF-Pro font-medium">{item.created_at.substr(0, 10)}</p>
                            </div>
                            <table className="text-white font-SF-Pro text-center mx-24">
                                <thead>
                                    <tr className="font-medium text-2xl underline">
                                        <th>Color</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-lg">
                                        <td>{item.color}</td>
                                        <td>{item.type}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="flex xl:mx-12 font-bold justify-between text-white font-SF-Pro text-3xl">
                                <h1>Price</h1>
                                <h1 className="flex gap-4">
                                    <div className="flex items-center justify-center bg-white group-hover:bg-black-container rounded-full min-w-9">
                                        <img src="/images/paw.png" className="w-5 h-5" />
                                    </div>
                                    {item.price}</h1>
                            </div>

                            <button className="rounded-sm hover:animate-bounce text-white font-SF-Pro place-self-center text-2xl font-bold bg-purple-interact h-12 w-2/3">
                                Purchase
                            </button>
                        </div>

                    </div>
                </div>}
            </div>
        </div>
    );
}

export default ItemPage;