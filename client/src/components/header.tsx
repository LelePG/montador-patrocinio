import { eventDescription } from "@/core";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeaderProps {
	isAdmin?: boolean;
}

export default function Header({ isAdmin }: HeaderProps) {
	return (
		<header className="bg-card border-b border-border">
			<div className="max-w-7xl mx-auto px-4 pb-10 pt-16">
				<div className="text-center relative">
					{isAdmin && (
						<div className="absolute  right-0">
							<Link href="/quotes">
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-2"
								>
									<FileText className="h-4 w-4" />
									Ver Propostas
								</Button>
							</Link>
						</div>
					)}

					<h2 className="text-2xl font-semibold text-yellow-custom mb-4">
						{eventDescription.name}
					</h2>
					<p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{eventDescription.description}
					</p>
				</div>
			</div>
		</header>
	);
}
