
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin SDK with environment variables
try {
  // Check if running in production with environment variables
  if (process.env.FIREBASE_PRIVATE_KEY) {
    const serviceAccount = {
      "type": "service_account",
      "project_id": process.env.FIREBASE_PROJECT_ID,
      "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
      "client_id": process.env.FIREBASE_CLIENT_ID,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    
    console.log("Firebase Admin initialized successfully");
  } else {
    console.warn("Firebase credentials not found in environment variables");
    // Initialize with application default credentials or other fallback
    admin.initializeApp();
  }
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
}

export default admin;
