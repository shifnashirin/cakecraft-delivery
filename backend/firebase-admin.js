
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = {
  "type": "service_account",
  "project_id": "cakedelight-79097",
  "private_key_id": "d4d7af0b8c49f6c188ea8f1f1f77de0fb02bfadf",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdkBT1tc9Gx7wY\n8x0TGSLXaOz+ib0WuBdm8Nlew4Wx4a6nhf7vAGXy4nVLBAvtyaPzGn2Qtq6oyx5j\nrE4MMdU1ZwOcbg33fVaOf+77rAmhDxA67KCwUYpzLzSm6e5D/1pXmEZCM7Pm+aWF\ndyLWMfxwDnXTcJivzR+noH3gXbRqG3g8PVhyEuAtCJhyDXZ5HtBjQSHz12NGPw/I\nwSQz5Opt13s5xFYzeo8jByISJafbBjA3MiA9Mfs3HDBrBrLEhB//EI1kySDKiXKb\nw8yPumL9btCAir6XC7FURUh6vke/y1IpBqaRY+c41w7l4072zW6uTYpaOPz0NXqg\nVLuzeaCBAgMBAAECggEAA6Fv7DQA51R/o/MJKNkfzYciS+C0YddC2clDtvxqIp3M\nypkqtUrk7n5znbOFi1iFvbqu6UReXK8Wf403PK5yx2Dc61A5Y+ooUg8GXJf7nlGU\nqgjtEHcGic4tCEoUZo52IFXWy5x5oSFAREWpILak5pectS8vY4CmYbRP5jk+iKHZ\nXQXq9slfXpqkwWHr9OCge1FI6pREyndlkuyMwLHJFHxHkEgufb974lfWkm+khhfV\n25rhfG0QAqhLl9g45p+swtNlK1N0CPcLn1tFGV3TGLBVRMb+YsjuzTvHBbx8ijWo\n7T4HkiLhAeT547WmbSlhf2qubcytFs1iMUhvG+jH4QKBgQDcdUSqfEzgtdc/4pSX\n+O45G4k3vnnW9T5HFp0j5bkPPEOLlkyfQrsVdTXUgkSzSbfB0dMZcQ4sQGDhIId9\ngcru9QT/3N6c8W9B39Aoi1atRjXhUSYu2PCZj7kTB2VPx4MWc6WAOnKCGU4GCF6L\nFrUDdP2TAyTWjEVeRESXUCG/sQKBgQC29wEoZ8M3ebu+Drt0hQynpgMvgKpijYh6\n1KjrToZrXnC7DhOr2UCLUUNXpP2BZpbjoX1wvUGMmdLv04CWEBZB+F375RcaDwoH\nTXZp3njHffposVnPwO8GBkQ+21Oqp9TD77PdsT5KnDNbQ5tUuMcVq6rQX9rZYgfN\nazFSwf9x0QKBgQCchxbOBZuAIRxH29StYq2iFo8C6VcQ7OffCYthJYaT7rH2tiyJ\nF5RF1Ab4b9XfhoPWNeiws7jgaoVe0v3gevtfVtDJ6kSVIkdgek0NvIE6XhN7e2ak\n9JtALO+3NxUT5BCLLGlh9h2/icAAQIkAMIstfS9d5mmNe+L033vkA50ywQKBgEks\n4s6pKT9vtXGe7MP+ToBiehWujPabioEtul1Z65LXk5iMWbu6SQEvQBK2jxkI0cI6\nnTPQzX2RK/b1DRF3X5+E2Pnctu+aIjWnent/GakXrmXewH/BtxcevH6zM3QmaYbv\nwG0i7Tnj3PpcQKyStjTpkoiCPcIBXgN/IpvpsONxAoGBALsRCGOLwcEkPRIFNOTt\nSmylZD05O17T07+DFttbODiPhnHsqai/NmUBJvUURnNyFjxBZCly9rzq7E8ZzGRV\nMmwuzn4HvyJIDhYGQtcP+AApp86YtWoWvOmeH8eCtyuKvNvBk2Xb19jKRy0cdQci\n247z4z6F1e//nykTdVeMU14+\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@cakedelight-79097.iam.gserviceaccount.com",
  "client_id": "104884612370903307382",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40cakedelight-79097.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;


