import { Database } from "@/core/model/Database";
import { FirebaseDatabase } from "@/lib/firebase-database";

export function useDatabase(): { database: Database } {
	const database = new FirebaseDatabase();
	return { database };
}
