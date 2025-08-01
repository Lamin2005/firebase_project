export function userGetInfo() {
  let user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    // If user is not signed in, return an empty object
    return { uid: null, name: null, email: null, photoURL: null };
  }
    // Check if user information is complete
  let { uid, name, email, photoURL } = user;

  return { uid, name, email, photoURL };
}

