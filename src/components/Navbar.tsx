import { useEffect, useState } from "react";
import API from "../axiosApi";

const Navbar = () => {
    const paw = "images/paw.png"
    const [dropdown, setDropdown] = useState(false);
    const [coins, setCoins] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [level, setLevel] = useState();


    const signOut = () => {
        API.post('/logout').then(() => {
            window.location.replace('/signin');
        });
        
    }   
    useEffect(() => {
        API.get(`/user`).then((response) => {
            setCoins(response.data.coins);
            setLevel(response.data.exp);
            setIsAdmin(response.data.is_admin);
        })
    }, []) 
    
    return (
        <div className="flex flex-col">
            <div className="flex bg-black-container w-full h-12 lg:h-20 lg:justify-between justify-end px-6">
                <div className="lg:flex h-full gap-6 items-center hidden">
                    <a href="/"><i className="fa-solid fa-house fa-2x hover:text-action-hover transition-all"></i></a>
                    <a href="/friends"><i className="fa-solid fa-cat fa-2x hover:text-action-hover transition-all"></i></a>
                    <a href="/"><i className="fa-solid fa-shirt fa-2x hover:text-action-hover transition-all"></i></a>
                    <a href="/"><i className="fa-solid fa-bag-shopping fa-2x hover:text-action-hover transition-all"></i></a>
                    <a href="/"><i className="fa-solid fa-gamepad fa-2x hover:text-action-hover transition-all"></i></a>
                    {isAdmin && <a href="/adminpanel"><i className="fa-solid fa-star fa-2x hover:text-action-hover transition-all"></i></a>}
                </div>
                <div className="flex h-full gap-6 items-center">
                    <div className="lg:flex flex-col h-full place-content-center hidden">
                        <div className="flex w-full justify-between text-white font-SF-Pro text-lg font-bold">
                            <div className="my-auto me-4 w-40 bg-white h-2">
                                {level && <div style={{width: `${((level/100)-Math.floor(level/100))*100  }%`}} className="bg-purple-interact h-full"></div>}
                            </div>
                            {level && <span>LVL {Math.floor(level/100)}</span>}
                        </div>
                        <div className="items-center flex w-full justify-end text-white font-SF-Pro text-lg font-bold">
                            <img src={paw} className="w-4 h-4 me-2" />
                            <span>{coins}</span>
                        </div>
                    </div>
                    <i onClick={() => dropdown ? setDropdown(false) : setDropdown(true)} className="fa-solid fa-bars fa-2x hover:text-action-hover hover:cursor-pointer transition-all"></i>
                </div>
            </div>
            {dropdown && <div className="w-56 h-64 mt-20 bg-black-container absolute place-self-end">
                <ul className="flex flex-col text-white text-2xl font-SF-Pro p-2 ps-4">
                    <li><button onClick={signOut} className="hover:text-purple-interact">Sign out</button></li>
                    <hr className="my-1 border-purple-interact"/>
                </ul>
            </div>}
        </div>
    );
}

export default Navbar