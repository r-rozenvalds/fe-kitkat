import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import API from "../axiosApi";

const EditProfile = () => {
    const [editUsername, setEditUsername] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [birthdate, setBirthdate] = useState();
    const [password, setPassword] = useState('*****');
    const [confirmPassword, setConfirmPassword] = useState('*****');
    const [id, setId] = useState();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        API.get(`/user`).then((response) => {
            console.log(response);
            setEmail(response.data.email);
            setUsername(response.data.username);
            setBirthdate(response.data.date_of_birth);
            setId(response.data.id);

        })
    }, [])

    const submitForm = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (password === '*****') {
            await API.put(`/users/${id}`, {
                date_of_birth: birthdate,
                email: email,
                username: username,
            }).then(() => {
                setError("");
                setSuccess("Successfully updated!");
            }).catch((error) => {
                setSuccess("");
                setError(error.response.data.message);
            })
        } else {
            await API.put(`/users/${id}`, {
                date_of_birth: birthdate,
                email: email,
                username: username,
                password: password,
                password_confirmation: confirmPassword,
            }).then(() => {
                setError("");
                setSuccess("Successfully updated!");
            }).catch((error) => {
                setSuccess("");
                setError(error.response.data.message);
            })
        }
    }


    return (
        <div className="w-full h-screen bg-black-background overflow-hidden">
            <div className=" w-3/4 h-full mx-auto">
                <Navbar />
                <div className="flex flex-col mt-1 bg-black-container h-full gap-2">
                    <h1 className="text-white text-4xl font-SF-Pro font-medium p-6">Edit your profile</h1>
                    <form className="flex flex-col items-center">
                        <div className="flex flex-col">
                            <h1 className="text-white text-3xl font-SF-Pro font-medium py-2">Username</h1>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="text-2xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Change username..." type="text"></input>
                            <h1 className="text-white text-3xl font-SF-Pro font-medium py-2">Email</h1>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="text-2xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Change email..." type="email"></input>
                            <h1 className="text-white text-3xl font-SF-Pro font-medium py-2">Password</h1>
                            <input value={password} onFocus={() => setPassword('')} onChange={(e) => setPassword(e.target.value)} className="text-2xl p-2 text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Change password..." type="password"></input>
                            <input value={confirmPassword} onFocus={() => setConfirmPassword('')} onChange={(e) => setConfirmPassword(e.target.value)} className="text-2xl mt-2 p-2 text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Confirm password..." type="password"></input>
                            <h1 className="text-white text-3xl font-SF-Pro font-medium py-2">Date of birth</h1>
                            <input value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="text-2xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Change email..." type="date"></input>



                            <button onClick={submitForm} className="font-SF-Pro mt-2 p-2 text-white text-2xl px-6 w-1/4 self-center border-black-background border-2 hover:bg-purple-interact">Save</button>
                            <div className="text-center mt-2">
                            {error && <p className="text-[#d90429] font-SF-Pro font-bold text-sm">{error}</p>}
                            {success && <p className="text-[#40916c] font-SF-Pro font-bold text-sm">{success}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;