import { Quota } from "../core/model";

import {
	agradecimentos_redes_sociais,
	envio_peca_email_por_peca,
	exibicao_video_30s_por_video,
} from "./BenefitList";

export const quotaA = new Quota({
	id: "quotaA",
	name: "Cota A",
	description: "Cota premium com máxima visibilidade",
	benefits: [
		exibicao_video_30s_por_video,
		envio_peca_email_por_peca,
		agradecimentos_redes_sociais,
	],
});
export const quotaB = new Quota({
	id: "quotaB",
	name: "Cota B",
	description: "Cota avançada com ótima exposição",
	benefits: [exibicao_video_30s_por_video, agradecimentos_redes_sociais],
});

export const personalizedQuota = new Quota({
	id: "personalizada",
	name: "Personalziada",
	description: "Cota personalizada",
	benefits: [],
});

export const QuotaList = [quotaA, quotaB];
