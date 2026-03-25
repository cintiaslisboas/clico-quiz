export type Profile = 'base_solida' | 'vulneravel' | 'em_risco' | 'critico';

export interface QuizAnswers {
  // Bloco 1 (Percepção vs Realidade)
  q1_1: number | null; // 0, 1, 2, 3
  q1_2: {
    fluxoCaixa: boolean;
    statusPedidos: boolean;
    gargalos: boolean;
    nenhumaDessas: boolean;
  };
  q1_3: number | null; // 0, 1, 2, 3
  q1_4: number | null; // 0, 2, 3

  // Bloco 2 (Custo do Caos)
  q2_1: {
    atrasos: boolean;
    perdaNegociacao: boolean;
    retrabalho: boolean;
    nenhum: boolean;
  };
  q2_2: number | null; // 0, 1, 3
  q2_3: number | null; // 2, 2, 2, 3
  q2_4: number | null; // 1, 2, 2, 3

  // Bloco 3 (Dependência Oculta)
  q3_1: number | null; // 0, 1, 2, 3
  q3_2: number | null; // 0, 1, 3
  q3_3: number | null; // 0, 1, 2, 3
  q3_4: number | null; // 0, 1, 3

  // Bloco 4 (Maturidade + IA)
  q4_1: number | null; // 0, 1, 3
  q4_2: number | null; // 0, 1, 3
  q4_3: number | null; // 0, 1, 3
  q4_4: number | null; // 0, 2, 3

  // Autoavaliação (Sliders 0-10)
  sliders: {
    clareza: number;
    eficiencia: number;
    independencia: number;
    usoTecnologia: number;
    capacidadeEscalar: number;
  };
}

export interface ScoreResult {
  rawB1: number;
  rawB2: number;
  rawB3: number;
  rawB4: number;

  scoreB1: number; // 0-100
  scoreB2: number; // 0-100
  scoreB3: number; // 0-100
  scoreB4: number; // 0-100

  mediaSliders: number; // 0-10
  scoreAutoaval: number; // 0-100

  scoreBlocos: number; // 0-100 ponderado
  scoreFinal: number; // 0-100

  perfil: Profile;
  piorBloco: string;
  segundoPiorBloco: string;
  paragrafo: string;
}

export interface LeadData {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  segmento: string;
  area_critica: string;
}
