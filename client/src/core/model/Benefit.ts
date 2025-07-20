import { z } from "zod";

export interface BenefitProps {
	id: string;
	name: string;
	description: string;
	value: number;
	quantity?: number;
	maxQuantity?: number;
}

export class Benefit {
	id: string;
	name: string;
	description: string;
	value: number;
	quantity?: number;
	maxQuantity?: number;

	constructor({
		id,
		name,
		description,
		value,
		quantity,
		maxQuantity,
	}: BenefitProps) {
		this.id = z.string().min(5).parse(id);
		this.name = z.string().min(2).max(100).parse(name);
		this.description = z.string().min(10).max(500).parse(description);
		this.value = z.number().min(0).parse(value);
		this.quantity =
			quantity !== undefined
				? z.number().int().min(0).parse(quantity)
				: undefined;
		this.maxQuantity =
			maxQuantity !== undefined
				? z.number().int().min(0).parse(maxQuantity)
				: undefined;
	}

	static fromJSON(json: string): Benefit {
		const data = JSON.parse(json);
		return new Benefit(data);
	}

	setQuantity(amount: number) {
		this.quantity = amount;
		return new Benefit(this.toJSON());
	}

	get totalValue() {
		return this.value * (this.quantity ?? 1);
	}

	toJSON(): BenefitProps {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			value: this.value,
			quantity: this.quantity,
			maxQuantity: this.maxQuantity,
		};
	}

	get formattedValue() {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(this.value);
	}

	get allowQuantitySelection() {
		return this.maxQuantity ? this.maxQuantity > 1 : false;
	}
}
