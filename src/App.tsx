import AdminPanel from "./components/AdminPanel";
import FriendSearch from "./components/User/FriendSearch";
import LoginComponent from "./components/User/LoginComponent"
import {Route, Routes} from 'react-router-dom';
import UserProfile from "./components/User/UserProfile";
import Store from "./components/Store/Store";
import EditProfile from "./components/User/EditProfile";
import ItemPage from "./components/Store/ItemPage";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<UserProfile/>}/>
        <Route path="/signin" element={<LoginComponent/>}/>
        <Route path="/friends" element={<FriendSearch/>}/>
        <Route path="/adminpanel" element={<AdminPanel/>}/>
        <Route path="/users/:id" element={<UserProfile/>}/>
        <Route path="/store" element={<Store/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/item/:id" element={<ItemPage/>}/>
      </Routes>
    </>
  )
  
}




export default App
