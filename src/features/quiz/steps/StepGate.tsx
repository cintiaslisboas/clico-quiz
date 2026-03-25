import { useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, LockIcon, Loader2 } from 'lucide-react';
import { saveLead } from '@/services/supabase/leads';

const leadSchema = z.object({
  nome: z.string().min(3, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().regex(/^\d{10,11}$/, 'WhatsApp deve ter 10 ou 11 dígitos numéricos'),
  empresa: z.string().min(2, 'Nome da empresa é obrigatório'),
  segmento: z.enum(['Varejo', 'Serviços', 'Indústria', 'Tecnologia', 'Saúde', 'Educação', 'Construção', 'Alimentação', 'Logística', 'Outro'], {
    message: 'Selecione um segmento válido'
  }),
  area_critica: z.enum(['Financeiro', 'Logística', 'Compras', 'Comercial', 'Produção', 'Outro'], {
    message: 'Selecione a área crítica'
  }),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function StepGate() {
  const { nextStep, scoreResult, setLeadData } = useQuizStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema)
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      setLeadData(data);
      // Salva no banco, mas se falhar, não impede o usuário de ver o resultado
      await saveLead(data, scoreResult).catch(e => console.error('Erro silencioso:', e));
      nextStep(); // Vai para a Tela 8 (Resultados)
    } catch (error) {
      console.error('Erro fatal:', error);
      nextStep(); // Garante o avanço
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white transition-all placeholder:text-slate-400";
  const labelClass = "block text-sm font-bold font-ruda text-slate-300 mb-1";
  const errorClass = "text-orange-400 text-xs mt-1 font-bold";

  return (
    <div className="animate-slide-up w-full max-w-xl mx-auto flex flex-col min-h-[80vh] py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-ruda font-black text-clico-white mb-4">
          Seu diagnóstico está pronto.
        </h2>
        <p className="font-lexend text-clico-warm-pale text-lg md:text-xl">
          Preencha abaixo para ver seus resultados detalhados:
        </p>
      </div>

      <div className="bg-clico-primary p-6 md:p-8 rounded-xl border border-clico-mid/20 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Nome Completo</label>
              <input type="text" placeholder="Seu nome" {...register('nome')} className={inputClass} />
              {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>E-mail Corporativo</label>
                <input type="email" placeholder="seu@email.com" {...register('email')} className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelClass}>WhatsApp (só números)</label>
                <input type="tel" placeholder="11999999999" {...register('whatsapp')} className={inputClass} />
                {errors.whatsapp && <p className={errorClass}>{errors.whatsapp.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Nome da Empresa</label>
              <input type="text" placeholder="Nome da sua empresa" {...register('empresa')} className={inputClass} />
              {errors.empresa && <p className={errorClass}>{errors.empresa.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Segmento do Negócio</label>
                <select {...register('segmento')} className={`${inputClass} appearance-none cursor-pointer`}>
                  <option value="">Selecione...</option>
                  <option value="Varejo">Varejo</option>
                  <option value="Serviços">Serviços</option>
                  <option value="Indústria">Indústria</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Educação">Educação</option>
                  <option value="Construção">Construção</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Logística">Logística</option>
                  <option value="Outro">Outro</option>
                </select>
                {errors.segmento && <p className={errorClass}>{errors.segmento.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Qual área gera mais dor hoje?</label>
                <select {...register('area_critica')} className={`${inputClass} appearance-none cursor-pointer`}>
                  <option value="">Selecione...</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Logística">Logística</option>
                  <option value="Compras">Compras</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Produção">Produção</option>
                  <option value="Outro">Outro</option>
                </select>
                {errors.area_critica && <p className={errorClass}>{errors.area_critica.message}</p>}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-clico-mid/20">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center space-x-2 bg-clico-accent-cyan text-clico-primary-dark font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(12,192,223,0.2)]
                ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 cursor-pointer'}
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Gerando Diagnóstico...</span>
                </>
              ) : (
                <>
                  <span>Ver meu diagnóstico</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <div className="mt-4 flex items-center justify-center text-clico-mid text-xs">
              <LockIcon className="w-3 h-3 mr-1" />
              <span>Seus dados são confidenciais e protegidos.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
