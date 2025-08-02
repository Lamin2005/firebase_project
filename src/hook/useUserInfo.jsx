import { useEffect, useState } from "react";
import { auth } from "../config/firebaseAuth";
import { useNavigate } from "react-router-dom";
export function useUserInfo() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    uid: null,
    name: null,
    email: null,
    photoURL: null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log("User is logged in:", firebaseUser.uid);
         // Set user information in state
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
        navigate("/moneytracker");
      } else {
        setUser({
          uid: null,
          name: null,
          email: null,
          photoURL: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  let { uid, name, email, photoURL } = user;

  // Log user information
  console.log("Current User Info:", { uid, name, email, photoURL });

  return { uid, name, email, photoURL };
}
