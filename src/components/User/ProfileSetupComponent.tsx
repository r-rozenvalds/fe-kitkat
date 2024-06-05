import API from "../../axiosApi";
import { useState } from "react";

const ProfileSetupComponent = ({ username, id }: { username: string, id: number }) => {

    const [dob, setDob] = useState(null);
    const [color, setColor] = useState("gray");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        setLoading(true);
        e.preventDefault();
        await API.post('/catcreator', {
            color: color,
        }).then(async (response) => {
        }).catch((error) => {
            alert(error.response.data.message);
        })
        await API.post(`/user/${id}/update`, {
            date_of_birth: dob,
        }).then(() => {
            setLoading(false);
            window.location.replace('/');
        }).catch((error) => {
            setLoading(false);
            alert(error.response.data.message);
        })
    }

    return (
        <div className="flex flex-col 2xl:gap-6 gap-1 p-6 h-full">
            <h1 className="lg:text-3xl text-2xl text-white font-SF-Pro font-bold">Almost there, {username}...</h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center 2xl:gap-12 gap-6 h-full justify-center">
                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="dob" className="text-xl text-white font-SF-Pro">When is your birthday?</label>
                    <input value={dob} onChange={(e) => setDob(e.target.value)} id="dob" type="date" className="bg-dark-background text-xl p-1 text-white" required></input>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <label className="text-xl text-white font-SF-Pro">What color will your cat be?</label>

                    <div className="flex gap-6">
                        <label htmlFor="grayColor" className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-[#adb5bd] cursor-pointer"></div>
                            <input onChange={(e) => setColor(e.target.value)} value="gray" checked={color==="gray"} className="peer hidden" name="catColor" id="grayColor" type="radio"></input>
                            <svg width="20" height="20" className="mt-2 peer-[:checked]:visible invisible">
                                <polygon points="10,0 0,20 20,20" className="fill-white"></polygon>
                            </svg>
                        </label>
                        <label htmlFor="orangeColor" className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-[#f4a261] cursor-pointer"></div>
                            <input onChange={(e) => setColor(e.target.value)} value="orange" checked={color==="orange"} className="peer hidden" name="catColor" id="orangeColor" type="radio"></input>
                            <svg width="20" height="20" className="mt-2 peer-[:checked]:visible invisible">
                                <polygon points="10,0 0,20 20,20" className="fill-white"></polygon>
                            </svg>
                        </label>
                        <label htmlFor="blackColor" className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-[#2b2d42] cursor-pointer"></div>
                            <input onChange={(e) => setColor(e.target.value)} value="black" checked={color==="black"} className="peer hidden" name="catColor" id="blackColor" type="radio"></input>
                            <svg width="20" height="20" className="mt-2 peer-[:checked]:visible invisible">
                                <polygon points="10,0 0,20 20,20" className="fill-white"></polygon>
                            </svg>
                        </label>
                    </div>
                </div>
                <button onClick={handleSubmit} className="p-1 px-24 bg-dark-background hover:bg-purple-interact text-white font-SF-Pro text-2xl">Submit</button>
            </form>
            {loading && <div className='flex space-x-3 justify-center items-center'>
                                <div className='h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div className='h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='h-3 w-3 bg-white rounded-full animate-bounce'></div>
                            </div>}
        </div>
    );
}

export default ProfileSetupComponent;