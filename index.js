import { db } from "./firebase.js";
import { doc, onSnapshot } from "firebase/firestore";
import fs from 'fs';
import path from 'path';

let originalBodyContent = ''; // Variable to hold the original body content as a string

const decrypt = () => {
  try {
    // Store original body content as a string
    originalBodyContent = document.body.innerHTML;

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
              // Read the HTML file using fs
              const htmlTemplate = fs.readFileSync(
                path.resolve(process.cwd(), 'content.html'), // Adjust the path if necessary
                'utf8'
              );

              // Set the inner HTML to the fetched content
              document.body.innerHTML = htmlTemplate;
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
