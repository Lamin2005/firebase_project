import { useUserInfo } from "./useUserInfo";
import { db } from "../config/firebaseAuth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function useGetTranslations() {
  let { uid } = useUserInfo();
  console.log("useGetTranslations uid:", uid);
  
  let [translations, setTranslations] = useState([]);
  let [loading, setLoading] = useState(true);
  let translationsCollection = collection(db, "translations");

  let getTranslations = () => {
    let usub;

    try {
      setLoading(true);
      let q = query(
        translationsCollection,
        where("uid", "==", uid),
        orderBy("createTime")
      );

      usub = onSnapshot(q, (snapshot) => {
        let translations = [];
        snapshot.docs.forEach((doc) => {
          translations.push({ ...doc.data(), id: doc.id });
        });

        setTranslations(translations);
        setLoading(false);
        // Log the fetched translations
        console.log("Translations fetched:", translations);
      });
    } catch (error) {
      console.log("Error fetching translations:", error);
    }

    return () => usub();
  };
  useEffect(() => {
    if (!uid) return;
    getTranslations();
  }, [uid]);

  return { translations,loading };
}
