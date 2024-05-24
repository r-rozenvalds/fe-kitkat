import AdminPanel from "./components/AdminPanel";
import FriendSearch from "./components/FriendSearch";
import Home from "./components/Home"
import LoginComponent from "./components/LoginComponent"
import {Route, Routes} from 'react-router-dom';
import UserProfile from "./components/UserProfile";
import Store from "./components/Store";
import EditProfile from "./components/EditProfile";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<LoginComponent/>}/>
        <Route path="/friends" element={<FriendSearch/>}/>
        <Route path="/adminpanel" element={<AdminPanel/>}/>
        <Route path="/users/:id" element={<UserProfile/>}/>
        <Route path="/store" element={<Store/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
      </Routes>
    </>
  )
  
}




export default App
