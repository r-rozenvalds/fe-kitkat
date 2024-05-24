import { useState } from "react";
import API from '../axiosApi';
import UnityComponent from "./UnityComponentLogin";
import ProfileSetupComponent from "./ProfileSetupComponent";


const LoginComponent = () => {
    const logo = "images/catlogo.png"
    const [loginActive, setLoginActive] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [doProfileSetup, setDoProfileSetup] = useState(false);
    const [id, setId] = useState();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await API.post('/login', {
            email: email,
            password: password,
        }).then(async (response) => {
            setId(response.data.id);
            setUsername(response.data.username);
            const token = response.data.token;
            localStorage.setItem("loginToken", token);
            await API.get(`/cats/${response.data.id}`).then((res) => {
                if(!res.data.exists) {
                    setDoProfileSetup(true);
                } else {
                    window.location.replace('/');
                    setError("");
                    setSuccess("Logging in...")
                }
            })
        }).catch((error) => {
            setError("Invalid email address or password.");
            
        })
    }

    const handleRegister = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        //try {
        await API.post('/register', {
            username: username,
            password: password,
            email: email,
            password_confirmation: confirmPassword,
        }).then(async (response) => {
            setId(response.data.id)
            await API.post('/login', {
                email: email,
                password: password,
            }).then(async (response) => {
                const token = response.data.token;
                localStorage.setItem("loginToken", token);
            }).catch((error) => {
                alert(error.response.data.status);
            })
            console.log(id);
            setDoProfileSetup(true);
            setError("");
            setSuccess("Setting up account...")

        }).catch((error) => {
            setError(error.response.data.message);
        })
    }

    return (
        <div className='flex w-screen h-screen bg-dark-background'>
            <div className="flex my-auto h-full w-full lg:h-2/3 lg:w-3/5 m-auto select-none">
                {doProfileSetup && <div className="h-full lg:w-2/5 w-full border-dark-background bg-dark-container transition-all">
                    <ProfileSetupComponent username={username} id={id}/>
                </div>}
                <div className="w-0 lg:w-3/5 h-full bg-dark-container lg:border-r-4 border-dark-background transition-all">
                    <UnityComponent />
                </div>
                {!doProfileSetup && loginActive &&
                    <div className="h-full w-full lg:w-2/5 bg-dark-container text-center flex flex-col justify-center px-16 transition-all">
                        <img src={logo} className="w-1/2 mx-auto" />
                        <h1 className="text-3xl mb-2 text-white font-SF-Pro font-bold">Welcome back!</h1>
                        <h5 className="text-xl mb-5 text-white font-semibold">Log in here:</h5>
                        <form onSubmit={handleLogin}>
                            <input style={error ? {border: "1px solid red"} : {border: "none"}} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" type="text" className="mb-5 h-8 w-full pl-2 pr-2 font-SF-Pro text-white bg-dark-background focus:outline-none focus:border-b border-white" /><br />
                            <input style={error ? {border: "1px solid red"} : {border: "none"}} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" className="mb-5 h-8 w-full pl-2 pr-2 text-white bg-dark-background focus:outline-none focus:border-b border-white" /><br />
                            <button onClick={handleLogin} className="bg-dark-background hover:bg-purple-interact w-full h-8 text-white font-SF-Pro focus:outline-none focus:border-b border-white">Log in</button>
                        </form>
                        <h5 onClick={() => setLoginActive(false) || setError("")} className="text-sm font-SF-Pro text-white my-3 hover:underline hover:cursor-pointer">Don't have an account?<br />Register</h5>
                        {error && <p className="text-[#d90429] font-SF-Pro font-bold text-sm">{error}</p>}
                        {success && <p className="text-[#40916c] font-SF-Pro font-bold text-sm">{success}</p>}

                    </div>}
                {!doProfileSetup && !loginActive &&
                    <div className="h-full xl:w-2/5 w-full bg-dark-container text-center flex flex-col justify-center px-16 transition-all">
                        <img src={logo} className="w-1/3 2xl:w-1/2 mx-auto" />
                        <h1 className="text-3xl text-white font-SF-Pro font-bold">Welcome!</h1>
                        <h5 className="text-xl mb-3 text-white font-semibold">Register here:</h5>
                        <form onSubmit={handleRegister}>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" type="text" className="2xl:mb-5 mb-3 h-8 w-full pl-2 pr-2 font-SF-Pro text-white bg-dark-background focus:outline-none focus:border-b border-white" /><br />
                            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" type="text" className="2xl:mb-5 mb-3 h-8 w-full pl-2 pr-2 font-SF-Pro text-white bg-dark-background focus:outline-none focus:border-b border-white" /><br />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" className="2xl:mb-5 mb-3 h-8 w-full pl-2 pr-2 text-white bg-dark-background focus:outline-none focus:border-b border-white" /><br />
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password" type="password" className="2xl:mb-5 mb-3 h-8 w-full pl-2 pr-2 text-white bg-dark-background focus:outline-none focus:border-b border-white" /><br />
                            <button onClick={handleRegister} className="bg-dark-background hover:bg-purple-interact w-full h-8 text-white font-SF-Pro focus:outline-none focus:border-b border-white">Register</button>
                        </form>
                        <h5 onClick={() => setLoginActive(true) || setError("")} className="text-sm font-SF-Pro text-white mt-2 hover:underline hover:cursor-pointer">Already have an account?<br />Login</h5>
                        {error && <p className="text-[#d90429] font-SF-Pro font-bold text-sm">{error}</p>}
                        {success && <p className="text-[#40916c] font-SF-Pro font-bold text-sm">{success}</p>}
                    </div>}
            </div>
        </div>

    );
}

export default LoginComponent;