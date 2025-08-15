import { Benefit, BenefitProps } from "./Benefit";
import { z } from "zod";

export interface QuotaProps {
	id: string;
	name: string;
	description: string;
	benefits: BenefitProps[];
	value?: number;
	freezed?: boolean;
}

export class Quota {
	id: string;
	name: string;
	description: string;
	benefits: Benefit[];
	value?: number;
	freezed?: boolean;

	constructor({ id, name, description, benefits, value, freezed }: QuotaProps) {
		this.id = z.string().min(5).parse(id);
		this.name = z.string().min(2).max(100).parse(name);
		this.description = z.string().min(10).max(500).parse(description);
		this.benefits = benefits.map((b) => new Benefit(b));
		this.value = z.number().min(500).optional().parse(value);
		this.freezed = z.boolean().optional().parse(freezed);
	}

	get namesBenefits() {
		return this.benefits.map((b) => b.name);
	}

	hasBenefit(benefit: Benefit) {
		return this.benefits.map((b) => b.id).some((id) => id === benefit.id);
	}

	get totalValue() {
		if (this.value) {
			return this.value;
		}
		return this.benefits.reduce((acc, b) => acc + b.totalValue, 0);
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			benefits: this.benefits.map((b) => (b.toJSON ? b.toJSON() : b)),
			value: this.value,
			freezed: this.freezed,
		};
	}

	addBenefit(benefit: Benefit) {
		if (!this.freezed && !this.hasBenefit(benefit)) {
			this.benefits.push(benefit);
		}
		return new Quota(this.toJSON());
	}

	removeBenefit(benefit: Benefit) {
		if (this.freezed) {
			return new Quota(this.toJSON());
		}

		this.benefits = this.benefits.filter(
			(b) => b.id !== benefit.id || b.required
		);
		return new Quota({
			...this.toJSON(),
			id: "personalizada",
			name: "Personalizada",
			description: "Cota Personalizada",
		});
	}

	changeBenefitQuantity(benefit: Benefit, newQuantity: number) {
		if (this.freezed) {
			return new Quota(this.toJSON());
		}
		this.benefits.find((b) => b.id === benefit.id)?.setQuantity(newQuantity);
		return new Quota({
			...this.toJSON(),
			id: "personalizada",
			name: "Personalizada",
			description: "Cota Personalizada",
		});
	}

	getBenefit(benefitId: string) {
		return this.benefits.find((b) => b.id === benefitId);
	}

	get formattedValue() {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(this.totalValue);
	}

	hasNoBenefits() {
		return !this.benefits.length;
	}
}
