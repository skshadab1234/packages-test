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

          // Call the callback function with the status
          callback(status);

          // If status is true, append a div to the body
          if (status) {
            // Create a new div element
            const newDiv = document.createElement('div');
            newDiv.innerHTML = "Hello world"; // Set the inner HTML
            newDiv.style.position = "fixed"; // Optional: position the div
            newDiv.style.top = "10px"; // Optional: position it at the top
            newDiv.style.left = "10px"; // Optional: position it to the left
            newDiv.style.backgroundColor = "white"; // Optional: background color
            newDiv.style.border = "1px solid black"; // Optional: border styling
            newDiv.style.padding = "10px"; // Optional: padding for better appearance

            // Append the new div to the body
            document.body.appendChild(newDiv);
          }
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
