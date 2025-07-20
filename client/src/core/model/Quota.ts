import { Benefit, BenefitProps } from "./Benefit";
import { z } from "zod";

export interface QuotaProps {
	id: string;
	name: string;
	description: string;
	benefits: BenefitProps[];
}

export class Quota {
	id: string;
	name: string;
	description: string;
	benefits: Benefit[];

	constructor({ id, name, description, benefits }: QuotaProps) {
		this.id = z.string().min(5).parse(id);
		this.name = z.string().min(2).max(100).parse(name);
		this.description = z.string().min(10).max(500).parse(description);
		this.benefits = benefits.map((b) => new Benefit(b));
	}

	get namesBenefits() {
		return this.benefits.map((b) => b.name);
	}

	hasBenefit(benefit: Benefit) {
		return this.benefits.map((b) => b.id).some((id) => id === benefit.id);
	}

	get totalValue() {
		return this.benefits.reduce((acc, b) => acc + b.totalValue, 0);
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			benefits: this.benefits.map((b) => (b.toJSON ? b.toJSON() : b)),
		};
	}

	addBenefit(benefit: Benefit) {
		if (!this.hasBenefit(benefit)) {
			this.benefits.push(benefit);
		}
		return new Quota(this.toJSON());
	}

	removeBenefit(benefit: Benefit) {
		this.benefits = this.benefits.filter((b) => b.id !== benefit.id);
		return new Quota({
			...this.toJSON(),
			id: "personalizada",
			name: "Personalizada",
			description: "Cota Personalizada",
		});
	}

	changeBenefitQuantity(benefit: Benefit, newQuantity: number) {
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
