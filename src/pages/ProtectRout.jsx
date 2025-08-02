import { useEffect } from "react";
import { useUserInfo } from "../hook/useUserInfo";
import  { Navigate } from "react-router-dom";

function ProtectRout({ children }) {
  let { uid } = useUserInfo();
  console.log("ProtectRout uid:", uid);
  // If uid is null, redirect to login page 
  if (!uid) {
    return <Navigate to="/" replace />;
  } 
  return children;
}

export default ProtectRout;