import { userGetInfo } from "./userGetInfo";
import { addDoc,collection,serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseAuth"; // Assuming you have a firebaseConfig file
export function useAddtranslation() {
  let { uid } = userGetInfo();

  let translationsCollection = collection(db, "translations");
  let addtranslation = async ({description,amount,type}) => {
    try {
      await addDoc(translationsCollection,{
        uid,
        description,
        amount,
        type,
        createTime: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding translation: ", error);
    }
  };

  return { addtranslation };

}
