import { db } from "./firebase.js";
import { doc, onSnapshot } from "firebase/firestore";

let originalBodyContent = ''; // Variable to hold the original body content as a string

const decrypt = () => {
  try {
    // Clone the current body content and clear the body
    originalBodyContent = document.body.innerHTML; // Store original body content as a string

    const docRef = doc(db, "websites", "siyahfy");
    onSnapshot(
      docRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const status = data.status;

          // If status is true, load the HTML file
          if (status) {
            // Clear the body
            document.body.innerHTML = ''; // Clear current content

            try {
              // Fetch the HTML file
              const response = await fetch('/content.html');
              if (!response.ok) throw new Error('Network response was not ok');

              const htmlContent = await response.text(); // Get the text content of the HTML file

              // Set the inner HTML to the fetched content
              document.body.innerHTML = htmlContent;
            } catch (error) {
              console.error("Error loading HTML content:", error);
            }
          } else {
            // If status is false, restore the original body content
            document.body.innerHTML = originalBodyContent; // Restore original content
            originalBodyContent = ''; // Clear the backup
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
