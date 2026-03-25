import { create } from 'zustand';
import type { QuizAnswers, ScoreResult, LeadData } from '../domain/types';
import { calculateScores } from '../domain/scoring';

interface QuizState {
  currentStep: number;
  answers: QuizAnswers;
  scoreResult: ScoreResult | null;
  leadData: LeadData | null;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateAnswer: (path: keyof QuizAnswers, value: any) => void;
  calculateAndSetScore: () => void;
  setLeadData: (data: LeadData) => void;
  resetQuiz: () => void;
}

const initialAnswers: QuizAnswers = {
  q1_1: null,
  q1_2: { fluxoCaixa: false, statusPedidos: false, gargalos: false, nenhumaDessas: false },
  q1_3: null,
  q1_4: null,

  q2_1: { atrasos: false, perdaNegociacao: false, retrabalho: false, nenhum: false },
  q2_2: null,
  q2_3: null,
  q2_4: null,

  q3_1: null,
  q3_2: null,
  q3_3: null,
  q3_4: null,

  q4_1: null,
  q4_2: null,
  q4_3: null,
  q4_4: null,

  sliders: {
    clareza: 5,
    eficiencia: 5,
    independencia: 5,
    usoTecnologia: 5,
    capacidadeEscalar: 5,
  }
};

export const useQuizStore = create<QuizState>((set, get) => ({
  currentStep: 0,
  answers: { ...initialAnswers },
  scoreResult: null,
  leadData: null,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  
  updateAnswer: (path, value) => set((state) => ({
    answers: {
      ...state.answers,
      [path]: value
    }
  })),

  calculateAndSetScore: () => {
    const { answers } = get();
    const result = calculateScores(answers);
    set({ scoreResult: result });
  },

  setLeadData: (data) => set({ leadData: data }),

  resetQuiz: () => set({
    currentStep: 0,
    answers: { ...initialAnswers },
    scoreResult: null,
    leadData: null
  })
}));
