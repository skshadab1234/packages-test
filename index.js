import { db } from './firebase.js'; // Import the Firestore instance
import { doc, onSnapshot } from 'firebase/firestore'; // Firestore functions

// Modified decrypt function to accept a callback
const decrypt = (callback) => {
    try {
        // Reference to the document in the 'websites' collection with a specific document ID
        const docRef = doc(db, "websites", "siyahfy"); // Replace with your document ID

        // Set up a real-time listener for the document
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const status = data.status; // Assuming 'status' field exists in your document

                // Trigger the callback with the status value
                callback(status);
            } else {
                console.log("No such document!");
                callback(null); // Pass null if no document exists
            }
        }, (error) => {
            console.error("Error fetching document in real-time:", error);
            callback(null); // Pass null in case of an error
        });
    } catch (error) {
        console.error("Error setting up real-time listener:", error);
        callback(null); // Pass null if there is an error
    }
};

// Export the function so it can be used elsewhere
export default decrypt;
