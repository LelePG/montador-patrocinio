import { BenefitProps } from "../core/model";

export const fala_5min_empresa: BenefitProps = {
	id: "fala_5min_empresa",
	name: "Fala de até 5 min sobre a empresa (porta-voz mulher)",
	description:
		"Apresentação de até 5 minutos pela porta-voz mulher sobre a empresa",
	value: 1200,
	maxQuantity: 1,
};

export const fala_10min_empresa: BenefitProps = {
	id: "fala_10min_empresa",
	name: "Fala de até 10 min sobre a empresa (porta-voz mulher)",
	description:
		"Apresentação de até 10 minutos pela porta-voz mulher sobre a empresa",
	value: 2000,
	maxQuantity: 1,
};

export const envio_peca_email: BenefitProps = {
	id: "envio_peca_email",
	name: "Envio de 1 peça de e-mail para o público do evento",
	description:
		"Envio de 1 peça de e-mail promocional para os participantes do evento",
	value: 900,
	maxQuantity: 3,
};

export const exibicao_video_30s: BenefitProps = {
	id: "exibicao_video_30s",
	name: "Exibição de 1 vídeo de 30 segundos",
	description:
		"Exibição de um vídeo promocional de 30 segundos durante o evento",
	value: 700,
	maxQuantity: 3,
};

export const postagem_peca_rede_social: BenefitProps = {
	id: "postagem_peca_rede_social",
	name: "Postagem de 1 peça dedicada nas redes sociais do GDG Pelotas",
	description:
		"Publicação de uma peça promocional nas redes sociais do GDG Pelotas",
	value: 300,
	maxQuantity: 5,
};

export const ingresso_dois_dias: BenefitProps = {
	id: "ingresso_dois_dias",
	name: "1 Ingresso para os dois dias de evento",
	description: "Ingresso válido para os dois dias do evento",
	value: 150,
	maxQuantity: 20,
};

export const ingresso_valor_primeiro: BenefitProps = {
	id: "ingresso_valor_primeiro",
	name: "Oportunidade de adquirir mais ingressos (valor de primeiro lote)",
	description:
		"Possibilidade de compra adicional de ingressos pelo preço do primeiro lote",
	value: 100,
};

export const logo_site_artes: BenefitProps = {
	id: "logo_site_artes",
	name: "Logo no site e nas artes impressas do evento",
	description:
		"Inserção da logo da empresa no site oficial e materiais impressos do evento",
	value: 350,
	maxQuantity: 1,
	required: true,
};

export const agradecimento_abertura_encerramento: BenefitProps = {
	id: "agradecimento_abertura_encerramento",
	name: "Agradecimento na abertura e encerramento do evento",
	description:
		"Menção de agradecimento durante a abertura e encerramento do evento",
	value: 250,
	maxQuantity: 1,
	required: true,
};

export const agradecimentos_redes_sociais: BenefitProps = {
	id: "agradecimentos_redes_sociais",
	name: "Agradecimentos gerais nas redes sociais do GDG Pelotas",
	description: "Agradecimentos públicos nas redes sociais do GDG Pelotas",
	value: 200,
	maxQuantity: 1,
	required: true,
};

export const BenefitList = [
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
];

export const RequiredBenefits = BenefitList.filter((b) => b.required);
