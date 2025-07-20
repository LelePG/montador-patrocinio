import { Quota, QuotaProps } from "./Quota";
import { z } from "zod";
import { v4 } from "uuid";

export interface FinalQuoteProps extends QuotaProps {
	contactName: string;
	contactEmail: string;
	comments: string;
}

export class FinalQuote extends Quota {
	contactName: string;
	contactEmail: string;
	comments: string;

	constructor(props: FinalQuoteProps) {
		super(props);
		this.contactName = z
			.string()
			.min(1, "Nome do contato é obrigatório")
			.parse(props.contactName);
		this.contactEmail = z
			.string()
			.email("E-mail inválido")
			.parse(props.contactEmail);
		this.comments = z.string().parse(props.comments);
	}

	toJSON() {
		const obj = {
			...super.toJSON(),
			contactName: this.contactName,
			contactEmail: this.contactEmail,
			comments: this.comments,
		};
		delete (obj as any).id;
		return obj;
	}
}
