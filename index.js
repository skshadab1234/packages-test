import { db } from "./firebase.js";
import { doc, onSnapshot } from "firebase/firestore";

const decrypt = (callback) => {
  try {
    const docRef = doc(db, "websites", "siyahfy");
    onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const status = data.status;

          callback(status);
        } else {
          console.log("No such document!");
          callback(null);
        }
      },
      (error) => {
        console.error("Error fetching document in real-time:", error);
        callback(null);
      }
    );
  } catch (error) {
    console.error("Error setting up real-time listener:", error);
    callback(null);
  }
};

export default decrypt;
