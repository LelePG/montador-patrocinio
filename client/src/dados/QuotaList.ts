import { Quota } from "../core/model";

import {
	fala_5min_empresa,
	fala_10min_empresa,
	envio_peca_email,
	exibicao_video_30s,
	postagem_peca_rede_social,
	ingresso_dois_dias,
	ingresso_valor_primeiro,
	logo_site_artes,
	agradecimento_abertura_encerramento,
	agradecimentos_redes_sociais,
	RequiredBenefits,
} from "./BenefitList";

export const quotaQuindim = new Quota({
	id: "quotaQuindim",
	name: "Cota Quindim",
	description: "Cota premium com máxima visibilidade",
	benefits: [
		...RequiredBenefits,
		fala_10min_empresa,
		{ ...exibicao_video_30s, quantity: 2 },
		{ ...postagem_peca_rede_social, quantity: 2 },
		ingresso_valor_primeiro,
		{ ...ingresso_dois_dias, quantity: 5 },
		{ ...envio_peca_email, quantity: 2 },
	],
});

export const cotaCamafeu = new Quota({
	id: "cotaCamafeu",
	name: "Cota Camafeu",
	description: "Cota intermediária com boa visibilidade",
	benefits: [
		...RequiredBenefits,
		exibicao_video_30s,
		postagem_peca_rede_social,
		ingresso_valor_primeiro,
		{ ...ingresso_dois_dias, quantity: 3 },
		fala_5min_empresa,
		{ ...envio_peca_email, quantity: 1 },
	],
});

export const cotaBemCasado = new Quota({
	id: "cotaBemCasado",
	name: "Cota Bem Casado",
	description: "Cota básica com benefícios essenciais",
	benefits: [
		...RequiredBenefits,
		exibicao_video_30s,
		postagem_peca_rede_social,
		ingresso_valor_primeiro,
		{ ...ingresso_dois_dias, quantity: 2 },
	],
});

export const cotaNinho = new Quota({
	id: "cotaNinho",
	name: "Cota Ninho",
	description: "Cota de entrada com benefícios limitados",
	benefits: [
		...RequiredBenefits,
		postagem_peca_rede_social,
		ingresso_valor_primeiro,
	],
});

export const personalizedQuota = new Quota({
	id: "personalizada",
	name: "Personalizada",
	description: "Cota personalizada",
	benefits: [...RequiredBenefits],
});

export const QuotaList = [quotaQuindim, cotaCamafeu, cotaBemCasado, cotaNinho];
