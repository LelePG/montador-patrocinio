import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDatabase } from "@/hooks/use-database";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
	Calendar,
	Mail,
	User,
	DollarSign,
	Package,
	MessageSquare,
	ArrowLeft,
	Copy,
	CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import Loader from "@/components/loader";
import { FinalQuote } from "@/core";

export default function QuoteDetail() {
	const [, params] = useRoute<{ id: string }>("/quotes/:id");
	const quoteId = params?.id;
	const { toast } = useToast();
	const { database } = useDatabase();
	const [emailCopied, setEmailCopied] = useState(false);

	const {
		data: quote,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["quote", quoteId],
		queryFn: async () => {
			console.log(quoteId);
			const data = await database.getQuote(quoteId!);
			console.log(data);
			return new FinalQuote(data as any);
		},
		enabled: !!quoteId,
	});

	const copyEmailToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(quote!.contactEmail);
			setEmailCopied(true);
			toast({
				title: "Email copiado!",
				description:
					"O endereço de email foi copiado para a área de transferência.",
			});
			setTimeout(() => setEmailCopied(false), 2000);
		} catch (err) {
			toast({
				title: "Erro ao copiar",
				description: "Não foi possível copiar o email.",
				variant: "destructive",
			});
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	if (error || (!isLoading && !quote)) {
		return (
			<div className="min-h-screen  py-8">
				<div className="container mx-auto px-4 max-w-6xl">
					<div className="flex items-center gap-4 mb-8">
						<Button variant="outline" size="sm" asChild>
							<Link href="/quotes">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Voltar
							</Link>
						</Button>
						<h1 className="text-3xl font-bold text-gray-200">
							Detalhes da Proposta
						</h1>
					</div>
					<Card className="border-red-200 dark:border-red-800">
						<CardContent className="pt-6">
							<div className="text-center text-red-600 dark:text-red-400">
								<p className="text-lg font-semibold mb-2">
									Erro ao carregar proposta
								</p>
								<p className="text-sm">
									Proposta não encontrada ou erro de conexão.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (!quote) {
		return (
			<div className="min-h-screen  py-8">
				<div className="container mx-auto px-4 max-w-6xl">
					<div className="flex items-center gap-4 mb-8">
						<Button variant="outline" size="sm" asChild>
							<Link href="/quotes">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Voltar
							</Link>
						</Button>
						<h1 className="text-3xl font-bold text-gray-200">
							Detalhes da Proposta
						</h1>
					</div>
					<Card>
						<CardContent className="pt-6">
							<div className="text-center text-gray-400">
								<p className="text-lg font-semibold mb-2">
									Proposta não encontrada
								</p>
								<p className="text-sm">
									A proposta que você está procurando não existe.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background py-8">
			<div className="container mx-auto px-4 max-w-6xl my-5">
				<div className="flex items-center gap-4 mb-8">
					<Button variant="outline" size="sm" asChild>
						<Link href="/quotes">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Voltar
						</Link>
					</Button>
					<h1 className="text-3xl font-bold text-gray-200">
						Detalhes da Proposta
					</h1>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-6">
						<Card className="shadow-sm border-gray-200 ">
							<CardHeader className="pb-4">
								<CardTitle className="flex items-center gap-2 text-gray-200">
									Informações de Contato
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className=" font-medium text-gray-400">Nome</label>
									<p className="text-lg font-semibold text-gray-200">
										{quote.contactName}
									</p>
								</div>
								<div>
									<label className=" font-medium text-gray-400">Email</label>
									<div className="flex items-center gap-2 mt-1">
										<Mail className="h-4 w-4 text-gray-500" />
										<p className="text-gray-200 flex-1">{quote.contactEmail}</p>
										<Button
											variant="outline"
											size="sm"
											onClick={copyEmailToClipboard}
											className="h-8 px-3"
										>
											{emailCopied ? (
												<CheckCircle className="h-4 w-4 text-green-600" />
											) : (
												<Copy className="h-4 w-4" />
											)}
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Selected Benefits */}
						<Card className="shadow-sm border-gray-200">
							<CardHeader className="pb-4">
								<CardTitle className="flex items-center gap-2 text-gray-200">
									<Package className="h-5 w-5 text-green-600 dark:text-green-400" />
									Benefícios Selecionados
								</CardTitle>
								<CardDescription>
									{quote.benefits?.length || 0} benefícios selecionados
								</CardDescription>
							</CardHeader>
							<CardContent>
								{quote.benefits && quote.benefits.length > 0 ? (
									<div className="space-y-3">
										{quote.benefits.map((benefit: any, index: number) => (
											<div
												key={index}
												className="flex items-center justify-between p-4  rounded-lg border border-gray-200 "
											>
												<div className="flex-1">
													<p className="font-medium text-gray-200">
														{benefit.name}
													</p>
												</div>
												{benefit.quantity && (
													<Badge
														variant="secondary"
														className="bg-blue-900 text-blue-300"
													>
														{benefit.quantity}x
													</Badge>
												)}
											</div>
										))}
									</div>
								) : (
									<p className="text-gray-400 text-center py-8">
										Nenhum benefício selecionado
									</p>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Financial Summary */}
						<Card className="shadow-sm border-gray-200 dark:border-gray-700">
							<CardHeader className="pb-4">
								<CardTitle className="flex items-center gap-2 text-gray-200">
									<DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
									Resumo Financeiro
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
									<p className="text-sm text-green-400 mb-2">
										Valor Total da Proposta
									</p>
									<p className="text-4xl font-bold text-green-400">
										{quote.formattedValue}
									</p>
								</div>

								{quote.name && (
									<div className="flex justify-between items-center py-3 mt-4 border-t-2 border-gray-200  ">
										<span className="font-medium text-gray-300">Cota:</span>
										<Badge
											variant="outline"
											className="bg-orange-900 text-gray-300 border-orange-500"
										>
											{quote.name}
										</Badge>
									</div>
								)}
							</CardContent>
						</Card>

						{quote.comments && (
							<Card className="shadow-sm border-gray-200 ">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-2 text-gray-200">
										<MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-400" />
										Comentários
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className=" rounded-lg p-4 border border-gray-200 ">
										<p className="text-gray-200 whitespace-pre-wrap">
											{quote.comments}
										</p>
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
