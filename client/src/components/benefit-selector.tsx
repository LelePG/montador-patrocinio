import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Quota, Benefit } from "@/core";
import { useState, useEffect } from "react";

interface BenefitSelectorProps {
	benefit: Benefit;
	quota: Quota;
	handleChangeQuota: (q: Quota) => void;
}

export default function BenefitSelector({
	benefit,
	quota,
	handleChangeQuota,
}: BenefitSelectorProps) {
	
	const [checked, setChecked] = useState(quota.hasBenefit(benefit));

	useEffect(() => {
		setChecked(quota.hasBenefit(benefit));
	}, [quota, benefit]);

	function handleCheckedChange(checked: boolean) {
		setChecked(checked);
		if (checked) {
			handleChangeQuota(quota.addBenefit(benefit));
		} else {
			handleChangeQuota(quota.removeBenefit(benefit));
		}
	}

	const handleQuantityChange = (newQuantity: number) => {
		handleChangeQuota(quota.changeBenefitQuantity(benefit, newQuantity));
	};

	return (
		<Card
			className={`bg-card/50 transition-all duration-300 ${
				checked
					? "border-blue-custom/50 bg-blue-custom/5"
					: "border-border hover:border-blue-custom/30"
			}`}
		>
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4 flex-1">
						<Checkbox
							checked={checked}
							onCheckedChange={(c: boolean) => handleCheckedChange(c)}
							className="data-[state=checked]:bg-blue-custom data-[state=checked]:border-blue-custom"
						/>
						<div className="flex-1">
							<Label className="font-medium text-foreground cursor-pointer">
								{benefit.description}
							</Label>
						</div>
						<div className="flex items-center space-x-4">
							<span className="text-green-custom font-bold">
								{benefit.formattedValue}
							</span>
							{benefit.allowQuantitySelection && (
								<div className="flex items-center space-x-2">
									<Label className="text-sm text-muted-foreground">Qtd:</Label>
									<Input
										type="number"
										min="1"
										max={benefit.maxQuantity || 1}
										value={
											quota.hasBenefit(benefit)
												? quota.getBenefit(benefit.id)?.quantity
												: 1
										}
										onChange={(e) =>
											handleQuantityChange(parseInt(e.target.value) || 1)
										}
										disabled={!checked}
										className="w-16 text-center text-sm"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
