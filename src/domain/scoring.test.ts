import { test, expect } from 'vitest';
import { calculateScores } from './scoring';
import type { QuizAnswers } from './types';

test('calculateScores generates correct profile and score for perfect answers', () => {
  const perfectAnswers: QuizAnswers = {
    q1_1: 0,
    q1_2: { fluxoCaixa: true, statusPedidos: true, gargalos: true, nenhumaDessas: false },
    q1_3: 0,
    q1_4: 0,
    q2_1: { atrasos: false, perdaNegociacao: false, retrabalho: false, nenhum: true },
    q2_2: 0,
    q2_3: 2, // Ideal answer is 2 (Tempo) or depends on context, but let's see. Max is 3. We want raw=0 for perfect? Wait, PRD says Q2.3 values are 2,2,2,3. Wait, 0 is best. If 2 is min, then it's not perfect 0.
    q2_4: 1, // min is 1
    q3_1: 0,
    q3_2: 0,
    q3_3: 0,
    q3_4: 0,
    q4_1: 0,
    q4_2: 0,
    q4_3: 0,
    q4_4: 0,
    sliders: {
      clareza: 10,
      eficiencia: 10,
      independencia: 10,
      usoTecnologia: 10,
      capacidadeEscalar: 10
    }
  };

  const result = calculateScores(perfectAnswers);
  // Max score formula: we want the lowest raw points for the best score.
  // scoreB1: rawB1 = 0 -> scoreB1 = (0/12)*100 = 0%
  // scoreB2: rawB2 = 0 + 0 + 2 + 1 = 3 -> scoreB2 = (3/15)*100 = 20%
  // scoreB3: rawB3 = 0 -> scoreB3 = 0%
  // scoreB4: rawB4 = 0 -> scoreB4 = 0%
  // scoreBlocos = (0*0.2) + (20*0.3) + (0) + (0) = 6%
  // scoreAutoaval = media 10 -> ((10-10)/10)*100 = 0%
  // scoreFinal = 6 * 0.70 + 0 * 0.30 = 4.2%
  
  expect(result.scoreFinal).toBe(4.2);
  expect(result.perfil).toBe('base_solida');
});

test('calculateScores generates correct profile and score for worst answers', () => {
  const worstAnswers: QuizAnswers = {
    q1_1: 3,
    q1_2: { fluxoCaixa: false, statusPedidos: false, gargalos: false, nenhumaDessas: true }, // raw 3
    q1_3: 3,
    q1_4: 3,
    q2_1: { atrasos: true, perdaNegociacao: true, retrabalho: true, nenhum: false }, // raw 6
    q2_2: 3,
    q2_3: 3, 
    q2_4: 3, 
    q3_1: 3,
    q3_2: 3,
    q3_3: 3,
    q3_4: 3,
    q4_1: 3,
    q4_2: 3,
    q4_3: 3,
    q4_4: 3,
    sliders: {
      clareza: 0,
      eficiencia: 0,
      independencia: 0,
      usoTecnologia: 0,
      capacidadeEscalar: 0
    }
  };

  const result = calculateScores(worstAnswers);
  // rawB1 = 3 + 3 + 3 + 3 = 12 (100%)
  // rawB2 = 6 + 3 + 3 + 3 = 15 (100%)
  // rawB3 = 3+3+3+3 = 12 (100%)
  // rawB4 = 12 (100%)
  // auto = media 0 -> ((10-0)/10)*100 = 100%
  
  expect(result.scoreFinal).toBe(100);
  expect(result.perfil).toBe('critico');
});
