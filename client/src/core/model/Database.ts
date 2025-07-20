import { FinalQuote } from "./FinalQuote";

export interface Database {
	saveQuote(quoteData: FinalQuote): Promise<{ success: boolean }>;
	getAllQuotes(): Promise<FinalQuote[]>;
	getQuote(quoteId: string): Promise<FinalQuote | null>;
}
