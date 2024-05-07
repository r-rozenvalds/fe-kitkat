import AdminPanel from "./components/AdminPanel";
import FriendSearch from "./components/FriendSearch";
import Home from "./components/Home"
import LoginComponent from "./components/LoginComponent"
import {Route, Routes} from 'react-router-dom';
import UserProfile from "./components/UserProfile";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<LoginComponent/>}/>
        <Route path="/friends" element={<FriendSearch/>}/>
        <Route path="/adminpanel" element={<AdminPanel/>}/>
        <Route path="/users/:id" element={<UserProfile/>}/>
      </Routes>
    </>
  )
  
}




export default App
