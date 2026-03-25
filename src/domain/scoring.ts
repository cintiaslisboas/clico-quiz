import type { QuizAnswers, ScoreResult, Profile } from './types';

// Constantes de Pesos e Máximos
const MAX_B1 = 12; // P1.1(3) + P1.2(3) + P1.3(3) + P1.4(3)
const MAX_B2 = 15; // P2.1(6) + P2.2(3) + P2.3(3) + P2.4(3)
const MAX_B3 = 12; // P3.1(3) + P3.2(3) + P3.3(3) + P3.4(3)
const MAX_B4 = 12; // P4.1(3) + P4.2(3) + P4.3(3) + P4.4(3)

const PESOS_BLOCO = {
  b1: 0.20,
  b2: 0.30,
  b3: 0.25,
  b4: 0.25,
};

const PESO_BLOCOS = 0.70;
const PESO_AUTOAVAL = 0.30;

const paragrafoDiagnostico: Record<Profile, string> = {
  base_solida: "Sua operação tem uma base mais sólida do que a maioria das empresas no mesmo estágio — e isso é um ativo real. Mas base sólida não é o mesmo que operação escalável. O diagnóstico indica pontos de atenção que ainda não viraram problema, mas vão virar conforme a empresa cresce. Quem estrutura antes de precisar escala sem desgaste. Quem espera o problema aparecer paga muito mais caro para resolver.",
  vulneravel: "Sua operação funciona — mas está sustentada por esforço humano, não por sistema. Isso significa que quanto mais você cresce, mais energia o time precisa gastar só para manter o que já existe. O diagnóstico revela vulnerabilidades que ainda não travam, mas que já consomem: retrabalho silencioso, decisões adiadas, dependências invisíveis. Sem ajuste estrutural, o teto operacional vai aparecer antes do esperado — e normalmente no pior momento.",
  em_risco: "Sua operação tem gargalos ativos que já estão limitando seu crescimento — mesmo que o financeiro ainda não mostre com clareza. O diagnóstico identificou padrões de caos que drenam margem em silêncio: tempo perdido em retrabalho, decisões tomadas sem informação confiável, processos que dependem de pessoas em vez de sistemas. Cada mês sem estrutura é crescimento represado e custo que você não consegue ver — mas que está lá.",
  critico: "Sua operação está operando no limite. O crescimento que você busca está sendo bloqueado de dentro — por falta de visibilidade, por dependência de pessoas-chave e por processos que existem só na cabeça de quem está há mais tempo na empresa. Nesse estágio, crescer sem estruturar primeiro não acelera: multiplica o caos. O diagnóstico é claro: não é questão de mercado nem de produto. É operação. E tem solução.",
};

export const calculateScores = (answers: QuizAnswers): ScoreResult => {
  // Bloco 1
  const rawP1_2 = answers.q1_2.nenhumaDessas ? 3 : 
    [answers.q1_2.fluxoCaixa, answers.q1_2.statusPedidos, answers.q1_2.gargalos]
      .filter((v) => !v).length;
  
  const rawB1 = (answers.q1_1 || 0) + rawP1_2 + (answers.q1_3 || 0) + (answers.q1_4 || 0);

  // Bloco 2
  const rawP2_1 = answers.q2_1.nenhum ? 0 : 
    (answers.q2_1.atrasos ? 2 : 0) + 
    (answers.q2_1.perdaNegociacao ? 2 : 0) + 
    (answers.q2_1.retrabalho ? 2 : 0);
  
  const rawB2 = rawP2_1 + (answers.q2_2 || 0) + (answers.q2_3 || 0) + (answers.q2_4 || 0);

  // Bloco 3
  const rawB3 = (answers.q3_1 || 0) + (answers.q3_2 || 0) + (answers.q3_3 || 0) + (answers.q3_4 || 0);

  // Bloco 4
  const rawB4 = (answers.q4_1 || 0) + (answers.q4_2 || 0) + (answers.q4_3 || 0) + (answers.q4_4 || 0);

  const norm = (pts: number, max: number) => (pts / max) * 100;

  const scoreB1 = norm(rawB1, MAX_B1);
  const scoreB2 = norm(rawB2, MAX_B2);
  const scoreB3 = norm(rawB3, MAX_B3);
  const scoreB4 = norm(rawB4, MAX_B4);

  const scoreBlocos = 
    (scoreB1 * PESOS_BLOCO.b1) + 
    (scoreB2 * PESOS_BLOCO.b2) + 
    (scoreB3 * PESOS_BLOCO.b3) + 
    (scoreB4 * PESOS_BLOCO.b4);

  // Autoavaliação
  const s = answers.sliders;
  const mediaSliders = (s.clareza + s.eficiencia + s.independencia + s.usoTecnologia + s.capacidadeEscalar) / 5;
  const scoreAutoaval = ((10 - mediaSliders) / 10) * 100;

  // Final
  const scoreFinal = (scoreBlocos * PESO_BLOCOS) + (scoreAutoaval * PESO_AUTOAVAL);

  const perfil = scoreFinal < 35 ? 'base_solida'
    : scoreFinal < 60 ? 'vulneravel'
    : scoreFinal < 80 ? 'em_risco'
    : 'critico';

  // Piores blocos
  const blocosLabel = [
    { id: 'b1', label: 'Percepção vs Realidade', score: scoreB1 },
    { id: 'b2', label: 'Custo do Caos', score: scoreB2 },
    { id: 'b3', label: 'Dependência Oculta', score: scoreB3 },
    { id: 'b4', label: 'Maturidade + IA', score: scoreB4 },
  ];
  blocosLabel.sort((a, b) => b.score - a.score);
  
  return {
    rawB1, rawB2, rawB3, rawB4,
    scoreB1, scoreB2, scoreB3, scoreB4,
    mediaSliders, scoreAutoaval, scoreBlocos,
    scoreFinal: Math.round(scoreFinal * 10) / 10,
    perfil,
    piorBloco: blocosLabel[0].id,
    segundoPiorBloco: blocosLabel[1].id,
    paragrafo: paragrafoDiagnostico[perfil]
  };
};
