import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quota } from "@/core";

interface QuotaCardProps {
	quota: Quota;
	isSelected: boolean;
	onSelect: () => void;
	color: number;
}

export default function QuotaCard({
	quota,
	isSelected,
	onSelect,
	color,
}: QuotaCardProps) {
	const getQuotaColors = () => {
		switch (color) {
			case 0:
				return {
					gradient: "from-yellow-custom/20 to-yellow-custom/10",
					border: isSelected
						? "border-yellow-custom"
						: "border-yellow-custom/30 hover:border-yellow-custom/60",
					text: "text-yellow-custom",
					button: "bg-yellow-custom hover:bg-yellow-custom/80 text-black",
				};
			case 1:
				return {
					gradient: "from-green-custom/20 to-green-custom/10",
					border: isSelected
						? "border-green-custom"
						: "border-green-custom/30 hover:border-green-custom/60",
					text: "text-green-custom",
					button: "bg-green-custom hover:bg-green-custom/80 text-white",
				};
			case 2:
				return {
					gradient: "from-blue-custom/20 to-blue-custom/10",
					border: isSelected
						? "border-blue-custom"
						: "border-blue-custom/30 hover:border-blue-custom/60",
					text: "text-blue-custom",
					button: "bg-blue-custom hover:bg-blue-custom/80 text-white",
				};
			case 3:
				return {
					gradient: "from-red-custom/20 to-red-custom/10",
					border: isSelected
						? "border-red-custom"
						: "border-red-custom/30 hover:border-red-custom/60",
					text: "text-red-custom",
					button: "bg-red-custom hover:bg-red-custom/80 text-white",
				};
			default:
				return {
					gradient: "from-blue-custom/20 to-blue-custom/10",
					border: isSelected
						? "border-blue-custom"
						: "border-blue-custom/30 hover:border-blue-custom/60",
					text: "text-blue-custom",
					button: "bg-blue-custom hover:bg-blue-custom/80 text-white",
				};
		}
	};

	const colors = getQuotaColors();
	return (
		<Card
			className={`bg-gradient-to-br ${colors.gradient} ${
				colors.border
			} cursor-pointer transition-all duration-300 ${
				isSelected ? "ring-2 ring-current" : ""
			}`}
			onClick={onSelect}
		>
			<CardContent className="p-6">
				<div className="flex items-center justify-between mb-3">
					<h4 className={`text-xl font-bold ${colors.text}`}>{quota.name}</h4>
					<span className={`text-2xl font-bold ${colors.text}`}>
						{quota.formattedValue}
					</span>
				</div>
				<p className="text-muted-foreground text-sm mb-4">
					{quota.description}
				</p>
				<Button
					className={`w-full ${colors.button} font-semibold transition-colors`}
					onClick={(e) => {
						e.stopPropagation();
						onSelect();
					}}
				>
					{isSelected ? "Cota Selecionada" : "Selecionar Cota"}
				</Button>
			</CardContent>
		</Card>
	);
}
