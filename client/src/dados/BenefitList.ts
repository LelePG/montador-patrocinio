import { BenefitProps } from "../core/model";

export const exibicao_video_30s_por_video: BenefitProps = {
	id: "exibicao_video_30s_por_video",
	name: "Exibição de vídeo",
	description:
		"Exibição de vídeo de 30 segundos durante o evento (value por vídeo)",
	value: 2000,
	maxQuantity: 10,
};

export const envio_peca_email_por_peca: BenefitProps = {
	id: "envio_peca_email_por_peca",
	name: "E-mail marketing",
	description:
		"Envio de peça de e-mail promocional para os participantes (value por peça)",
	value: 850,
	maxQuantity: 10,
};

export const agradecimentos_redes_sociais: BenefitProps = {
	id: "agradecimentos_redes_sociais",
	name: "Agradecimentos sociais",
	description:
		"Agradecimentos especiais nas redes sociais do evento com menção à sua marca",
	value: 1200,
	maxQuantity: 1,
};

export const BenefitList = [
	exibicao_video_30s_por_video,
	envio_peca_email_por_peca,
	agradecimentos_redes_sociais,
];
