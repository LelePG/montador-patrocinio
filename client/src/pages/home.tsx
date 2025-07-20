import { useState } from "react";
import { Package as PackageIcon, List, FileText } from "lucide-react";
import QuotaCard from "@/components/quota-card";
import BenefitSelector from "@/components/benefit-selector";
import TotalCalculator from "@/components/total-calculator";
import {
	BenefitList,
	Quota,
	QuotaList,
	Benefit,
	personalizedQuota,
} from "@/core";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface HomeProps {
	isAdmin?: boolean;
}

export default function Home({ isAdmin }: HomeProps) {
	const [selectedQuota, setSelectedQuota] = useState<Quota>(personalizedQuota);
	const benefits = BenefitList;
	const packages = QuotaList;

	return (
		<div className="min-h-screen bg-background">
			<Header isAdmin={isAdmin} />

			<main className="max-w-7xl mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<section className="mb-8">
							<h3 className="text-2xl font-bold mb-6 flex items-center">
								<PackageIcon className="text-blue-custom mr-3" size={28} />
								Cotas Fixas
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{packages.map((currentQuota, i) => (
									<QuotaCard
										key={currentQuota.id}
										quota={currentQuota}
										color={i % 4}
										isSelected={selectedQuota?.id === currentQuota.id}
										onSelect={() => setSelectedQuota(currentQuota)}
									/>
								))}
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-bold mb-6 flex items-center">
								<List className="text-green-custom mr-3" size={28} />
								Benefícios Individuais
							</h3>
							<div className="space-y-4">
								{benefits.map((benefit: any) => {
									return (
										<BenefitSelector
											key={benefit.id}
											benefit={new Benefit(benefit)}
											quota={selectedQuota}
											handleChangeQuota={setSelectedQuota}
										/>
									);
								})}
							</div>
						</section>
					</div>

					<div className="lg:col-span-1">
						<TotalCalculator
							quota={selectedQuota}
							onClearSelection={() => {
								setSelectedQuota(personalizedQuota);
							}}
						/>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
