import "server-only";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import type { ContactData } from "@/lib/validation/contact";
import { getServerFirebaseApp } from "./server-app";

export const CONTACT_COLLECTION = "contact_requests";

export type SaveResult =
  | { stored: true; id: string }
  | { stored: false; reason: "not_configured" | "error" };

/**
 * Persists a validated contact request. The document shape must match the
 * `isValidContactRequest` function in firestore.rules exactly.
 */
export async function saveContactRequest(data: ContactData): Promise<SaveResult> {
  try {
    const app = await getServerFirebaseApp();
    if (!app) return { stored: false, reason: "not_configured" };

    const ref = await addDoc(collection(getFirestore(app), CONTACT_COLLECTION), {
      name: data.name,
      businessName: data.businessName,
      email: data.email,
      phone: data.phone || null,
      businessType: data.businessType,
      service: data.service,
      projectDescription: data.projectDescription,
      budget: data.budget || null,
      kvkkConsent: true,
      createdAt: serverTimestamp(),
      status: "new",
    });
    return { stored: true, id: ref.id };
  } catch (err) {
    console.error("[contact] Firestore write failed:", err instanceof Error ? err.message : err);
    return { stored: false, reason: "error" };
  }
}
