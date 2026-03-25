import { supabase } from './client';
import type { LeadData, ScoreResult } from '../../domain/types';

export const saveLead = async (lead: LeadData, scoreResult: ScoreResult | null) => {
  if (!scoreResult) {
    throw new Error("Score result is required to save lead");
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        nome: lead.nome,
        email: lead.email,
        whatsapp: lead.whatsapp,
        empresa: lead.empresa,
        segmento: lead.segmento,
        area_critica: lead.area_critica,
        score_final: scoreResult.scoreFinal,
        perfil: scoreResult.perfil,
        score_b1: scoreResult.scoreB1,
        score_b2: scoreResult.scoreB2,
        score_b3: scoreResult.scoreB3,
        score_b4: scoreResult.scoreB4,
        pior_bloco: scoreResult.piorBloco,
        segundo_pior_bloco: scoreResult.segundoPiorBloco,
        cta_clicado: 'none' // Inicializado
      }
    ])
    .select();

  if (error) {
    console.error("Erro inserindo lead:", error);
    throw error;
  }

  return data;
};

export const updateLeadCTA = async (email: string, cta: 'whatsapp' | 'pagamento') => {
  const { data, error } = await supabase
    .from('leads')
    .update({ cta_clicado: cta })
    .match({ email }); // Assumindo email como identificador único para essa sessão, embora na prática o ID seria melhor.
    
  if (error) {
    console.error("Erro atualizando CTA do lead:", error);
    throw error;
  }

  return data;
};
