import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<Card className="w-full max-w-md mx-4">
				<CardContent className="pt-6">
					<div className="flex mb-4 gap-2">
						<AlertCircle className="h-8 w-8 text-red-500" />
						<h1 className="text-2xl font-bold ">404 Page Not Found</h1>
					</div>

					<p className="mt-4 ">
						Não conseguimos encontrar essa página. Que tal voltar para o
						<Link
							href="/"
							className="text-blue-400 hover:underline font-medium mx-1"
						>
							Início
						</Link>
						?
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
