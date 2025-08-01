import { userGetInfo } from "../hook/userGetInfo";
import  { Navigate } from "react-router-dom";

function ProtectRout({ children }) {
  let { uid } = userGetInfo();

  if (uid === null) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectRout;