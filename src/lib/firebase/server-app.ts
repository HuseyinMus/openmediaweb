import "server-only";
import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

/**
 * Server-side Firebase (JavaScript SDK).
 *
 * The browser never talks to Firebase directly. The contact API route signs
 * in as a dedicated, low-privilege "contact writer" account, and Firestore
 * security rules only allow that account to create validated documents in
 * `contact_requests`. Nobody — including that account — can read, update or
 * delete submissions through the SDK; you review them in the Firebase console.
 *
 * All values come from server-only environment variables (no NEXT_PUBLIC_),
 * so none of this configuration is shipped to the browser.
 */

const APP_NAME = "open-media-server";

function readConfig(): { options: FirebaseOptions; email: string; password: string } | null {
  const apiKey = process.env.FIREBASE_API_KEY;
  const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const appId = process.env.FIREBASE_APP_ID;
  const email = process.env.FIREBASE_CONTACT_WRITER_EMAIL;
  const password = process.env.FIREBASE_CONTACT_WRITER_PASSWORD;
  if (!apiKey || !authDomain || !projectId || !appId || !email || !password) return null;
  return { options: { apiKey, authDomain, projectId, appId }, email, password };
}

export function isFirebaseConfigured() {
  return readConfig() !== null;
}

let signingIn: Promise<unknown> | null = null;

/** Returns an authenticated Firebase app, or null when not configured. */
export async function getServerFirebaseApp(): Promise<FirebaseApp | null> {
  const config = readConfig();
  if (!config) return null;

  const app = getApps().find((a) => a.name === APP_NAME) ?? initializeApp(config.options, APP_NAME);
  const auth = getAuth(app);

  if (!auth.currentUser) {
    signingIn ??= signInWithEmailAndPassword(auth, config.email, config.password).finally(() => {
      signingIn = null;
    });
    await signingIn;
  }
  return app;
}
