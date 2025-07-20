import { Mail, Instagram, Linkedin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
	return (
		<footer className="bg-card border-t border-border py-8 mt-auto">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<p className="text-muted-foreground flex items-center">
							Feito com{" "}
							<Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" /> pelo
							GDG Pelotas
						</p>
					</div>

					<div className="flex flex-wrap gap-4 justify-center">
						<Button
							variant="ghost"
							size="sm"
							className="flex items-center gap-2"
							asChild
						>
							<a
								href="mailto:gdgpelotas@gmail.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Mail className="h-4 w-4 text-blue-custom" />
								<span>gdgpelotas@gmail.com</span>
							</a>
						</Button>

						<Button
							variant="ghost"
							size="sm"
							className="flex items-center gap-2"
							asChild
						>
							<a
								href="https://www.instagram.com/gdgpelotas"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Instagram className="h-4 w-4 text-pink-500" />
								<span>@gdgpelotas</span>
							</a>
						</Button>

						<Button
							variant="ghost"
							size="sm"
							className="flex items-center gap-2"
							asChild
						>
							<a
								href="https://www.linkedin.com/company/gdg-pelotas"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Linkedin className="h-4 w-4 text-blue-600" />
								<span>GDG Pelotas</span>
							</a>
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
}
