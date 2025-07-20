import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Trash2, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import ProposalForm from "./proposal-form";
import { FinalQuote, Quota } from "@/core";
import { useDatabase } from "@/hooks/use-database";

interface TotalCalculatorProps {
	quota: Quota;
	onClearSelection: () => void;
}

export default function TotalCalculator({
	quota,

	onClearSelection,
}: TotalCalculatorProps) {
	const { toast } = useToast();
	const [showForm, setShowForm] = useState(false);
	const { database } = useDatabase();

	const createQuoteMutation = useMutation({
		mutationFn: async (quoteData: FinalQuote) => {
			return Promise.race([
				database.saveQuote(quoteData),
				new Promise((_, reject) =>
					setTimeout(
						() =>
							reject(
								new Error("Timeout: A operação demorou muito para completar")
							),
						15000
					)
				),
			]) as Promise<{ success: boolean; id: string }>;
		},
		onSuccess: (result) => {
			toast({
				title: "Proposta enviada com sucesso!",
				description: `Sua proposta foi registrada!`,
			});
			setShowForm(false);
			onClearSelection();
		},
		onError: (error: any) => {
			console.error("Error saving to Firebase:", error);
			toast({
				title: "Erro ao enviar proposta",
				description:
					error.message || "Verifique sua conexão e tente novamente.",
				variant: "destructive",
			});
		},
	});

	const handleSendProposal = () => {
		if (quota.hasNoBenefits()) {
			toast({
				title: "Nenhum benefício selecionado",
				description:
					"Selecione pelo menos um benefício para enviar a proposta.",
				variant: "destructive",
			});
			return;
		}
		setShowForm(true);
	};

	const handleFormSubmit = (formData: {
		name: string;
		email: string;
		comments?: string;
	}) => {
		createQuoteMutation.mutate(
			new FinalQuote({
				...quota.toJSON(),
				contactName: formData.name,
				contactEmail: formData.email,
				comments: formData.comments || "",
			})
		);
	};

	return (
		<div className="sticky top-8">
			<Card className="bg-gradient-to-br from-card to-muted/20 border-border">
				<CardHeader>
					<CardTitle className="flex items-center">
						<Calculator className="text-blue-custom mr-3" size={24} />
						Resumo da Cota
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{quota && (
						<div className="bg-blue-custom/20 border border-blue-custom/30 rounded-lg p-3">
							<span className="text-sm text-muted-foreground">
								Cota Selecionada:
							</span>
							<p className="font-semibold text-blue-custom">{quota.name}</p>
						</div>
					)}

					<div>
						<h4 className="font-semibold mb-3 text-muted-foreground">
							Benefícios Selecionados:
						</h4>
						<div className="space-y-2 text-sm">
							{quota.hasNoBenefits() ? (
								<p className="text-muted-foreground italic">
									Nenhum benefício selecionado
								</p>
							) : (
								quota.benefits.map((benefit) => (
									<div
										key={benefit!.id}
										className="flex justify-between items-center py-1"
									>
										<div className="flex-1">
											<span className="text-foreground">
												{benefit.description}
											</span>
											{benefit!.quantity! > 1 && (
												<Badge variant="secondary" className="ml-2 text-xs">
													{benefit.quantity}x
												</Badge>
											)}
										</div>
										<span className="text-green-custom font-semibold ml-2">
											{benefit.formattedValue}
										</span>
									</div>
								))
							)}
						</div>
					</div>

					<div className="border-t border-border pt-4 space-y-4">
						<div className="flex justify-between items-center">
							<span className="text-lg font-semibold">Total:</span>
							<span className="text-3xl font-bold text-green-custom">
								{quota.formattedValue}
							</span>
						</div>

						<Button
							onClick={onClearSelection}
							variant="outline"
							className="w-full border-red-custom/30 text-red-custom hover:bg-red-custom/10 hover:border-red-custom/60"
							disabled={quota.hasNoBenefits()}
						>
							<Trash2 className="mr-2" size={16} />
							Limpar Seleção
						</Button>

						<Button
							onClick={handleSendProposal}
							disabled={quota.hasNoBenefits() || createQuoteMutation.isPending}
							className="w-full bg-gradient-to-r from-blue-custom to-green-custom hover:from-blue-custom/80 hover:to-green-custom/80 text-white font-semibold transition-all duration-300"
						>
							<Send className="mr-2" size={16} />
							Enviar Proposta
						</Button>
					</div>
				</CardContent>
			</Card>

			{showForm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<ProposalForm
						onSubmit={handleFormSubmit}
						onCancel={() => setShowForm(false)}
						isSubmitting={createQuoteMutation.isPending}
					/>
				</div>
			)}
		</div>
	);
}
