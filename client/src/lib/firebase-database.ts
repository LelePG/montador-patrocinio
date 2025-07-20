import { FinalQuote, Database, FinalQuoteProps } from "@/core";
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	doc,
	getDoc,
	Firestore,
} from "firebase/firestore";

function getFirestoreApp() {
	const firebaseConfig = {
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
		authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
		storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	};
	const app = initializeApp(firebaseConfig);
	return getFirestore(app);
}

export class FirebaseDatabase implements Database {
	private db: Firestore;
	private DB_NAME = "sponsorship_quotes";

	constructor() {
		this.db = getFirestoreApp();
	}

	async saveQuote(quoteData: FinalQuote): Promise<{ success: boolean }> {
		try {
			const sanitizedData = JSON.parse(JSON.stringify(quoteData.toJSON()));

			await addDoc(collection(this.db, this.DB_NAME), {
				...sanitizedData,
				createdAt: new Date().toISOString(),
			});
			return { success: true };
		} catch (error: any) {
			return { success: false };
		}
	}

	async getAllQuotes(): Promise<FinalQuote[]> {
		const quotesRef = collection(this.db, this.DB_NAME);
		const querySnapshot = await getDocs(quotesRef);
		return querySnapshot.docs.map(
			(doc) => new FinalQuote({ ...doc.data(), id: doc.id } as FinalQuoteProps)
		);
	}

	async getQuote(quoteId: string): Promise<FinalQuote | null> {
		const quoteRef = doc(this.db, this.DB_NAME, quoteId);
		const docSnapshot = await getDoc(quoteRef);
		return docSnapshot.exists()
			? new FinalQuote({
					...docSnapshot.data(),
					id: docSnapshot.id,
			  } as FinalQuoteProps)
			: null;
	}
}
