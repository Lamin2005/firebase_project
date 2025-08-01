import { useState } from "react";
import {auth, prvider} from "../config/firebaseAuth";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userGetInfo } from "../hook/userGetInfo";


function Login() {

  let [loading,setLoading] = useState(false);
  let navigate = useNavigate();
  let { uid } = userGetInfo();

  if(uid){
    // If user is already signed in, redirect to money tracker page
    navigate('/moneytracker');
  }

  // Function to handle sign-in with Google
  let Sigin = async () => {
    try {
      setLoading(true);
      let result = await signInWithPopup(auth, prvider);
      console.log(result);
      let user = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
      };
      // Store user information in local storage
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      alert("Sign in successful!");
      navigate('/moneytracker');
    } catch (error) {
      setLoading(false);
      console.log("Error signing in: ", error);
      alert("Error signing in: " + error.message);
    }
  }

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <h1>This is a login page</h1>
      <button onClick={()=>{
        Sigin()
      }} style={{cursor:"pointer",padding:"0.5rem 2rem"}}>{loading ? "Sigining..." : "Sigin"}</button>
    </div>
    
    
  )
}

export default Login;