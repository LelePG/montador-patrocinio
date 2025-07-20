import { useQuery } from "@tanstack/react-query";
import { useDatabase } from "@/hooks/use-database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FinalQuote } from "@/core";
import Loader from "@/components/loader";

export default function Quotes() {
	const { database } = useDatabase();

	const {
		data: quotes,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["quotes"],
		queryFn: async () => {
			const allQuotes = await database.getAllQuotes();
			console.log("All quotes fetched:", allQuotes);
			return allQuotes;
		},
	});

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		console.error("Error fetching quotes:", error);
		return (
			<div className="min-h-screen bg-background py-8">
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center mb-8">
						<h1 className="text-3xl font-bold text-white">
							Propostas de Patrocínio
						</h1>
						<Link href="/">
							<Button variant="outline">Voltar</Button>
						</Link>
					</div>
					<Card className="w-full max-w-md mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-400">
								<p className="text-lg font-semibold mb-2">
									Erro ao carregar propostas
								</p>
								<p className="">Verifique sua conexão e tente novamente.</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background py-8">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-white">
						Propostas de Patrocínio
					</h1>
					<Link href="/">
						<Button variant="outline">Voltar</Button>
					</Link>
				</div>

				{quotes && quotes.length === 0 ? (
					<Card className="w-full max-w-md mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-gray-200">
								<p className="text-lg font-semibold mb-2">
									Nenhuma proposta encontrada
								</p>
								<p className="">
									Ainda não há propostas de patrocínio cadastradas.
								</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{quotes?.map((quote: FinalQuote) => (
							<Card
								key={quote.id}
								className="w-full hover:shadow-lg transition-shadow duration-300 flex flex-col"
							>
								<CardHeader>
									<div className="flex justify-between items-start">
										<div className="flex-1">
											<CardTitle className="text-lg font-semibold text-white mb-1">
												Proposta enviada por: {quote.contactName}
											</CardTitle>
										</div>
										{quote.name && (
											<Badge variant="outline" className="text-xs max-w-fit">
												Cota: {quote.name}
											</Badge>
										)}
									</div>
								</CardHeader>
								<div className="flex-grow"></div>
								<CardContent>
									<div className="space-y-3">
										<span className=" font-bold text-green-400">
											Valor Proposto: {quote.formattedValue}
										</span>
									</div>

									<div className="mt-4  pt-4 border-t border-gray-700">
										<Link href={`/quotes/${quote.id}`}>
											<Button className="w-full" size="sm">
												Ver Detalhes
											</Button>
										</Link>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
