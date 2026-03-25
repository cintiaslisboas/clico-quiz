import { useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { ArrowRight, MessageCircle, FileText, Target, Zap, Bot, CheckCircle2 } from 'lucide-react';
import { updateLeadCTA } from '@/services/supabase/leads';

export default function StepCTA() {
  const { scoreResult } = useQuizStore();
  const [paymentClicked, setPaymentClicked] = useState(false);

  if (!scoreResult) return null;

  const getColorByScore = (score: number) => {
    if (score < 35) return '#2ECC71'; 
    if (score < 60) return '#F1C40F';
    if (score < 80) return '#CD6E20'; 
    return '#E74C3C'; 
  };

  const finalColor = getColorByScore(scoreResult.scoreFinal);

  const getProfileLabel = (perfil: string) => {
    switch(perfil) {
      case 'base_solida': return 'Base Sólida';
      case 'vulneravel': return 'Operação Vulnerável';
      case 'em_risco': return 'Operação em Risco';
      case 'critico': return 'Operação Crítica';
      default: return '';
    }
  };

  const handlePaymentClick = async () => {
    setPaymentClicked(true);
    const { leadData } = useQuizStore.getState();
    if (leadData?.email) {
      updateLeadCTA(leadData.email, 'pagamento').catch(console.error);
    }
    const paymentUrl = import.meta.env.VITE_URL_PAGAMENTO || 'https://checkout.nubank.com.br/tklN8xuaHEzmpoc';
    window.location.href = paymentUrl; 
  };

  const handleWhatsappClick = () => {
    const { leadData } = useQuizStore.getState();
    if (leadData?.email) {
      updateLeadCTA(leadData.email, 'whatsapp').catch(console.error);
    }
    window.open('https://wa.me/5512992247184?text=Ol%C3%A1%20C%C3%ADntia%2C%20fiz%20o%20pr%C3%A9-diagn%C3%B3stico%20da%20CLI.CO%20e%20tenho%20d%C3%BAvidas%20sobre%20o%20Diagn%C3%B3stico%20Operacional.', '_blank');
  };

  return (
    <div className="animate-slide-up w-full max-w-3xl mx-auto flex flex-col min-h-[80vh] py-8 pb-16">
      
      {/* Bloco 1: Âncora no Diagnóstico */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" style={{ backgroundColor: `${finalColor}10`, borderColor: finalColor }}>
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: finalColor }}></div>
          <span className="font-bold text-sm" style={{ color: finalColor }}>{getProfileLabel(scoreResult.perfil)} ({scoreResult.scoreFinal}%)</span>
        </div>
        <p className="font-lexend text-clico-warm-pale text-lg md:text-xl max-w-2xl mx-auto italic border-l-4 pl-6 text-left" style={{ borderColor: finalColor }}>
          "{scoreResult.paragrafo}"
        </p>
      </div>

      {/* Bloco 2: Transição */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-ruda font-black text-clico-white mb-4">
          O pré-diagnóstico mostrou os padrões.
        </h2>
        <p className="font-lexend text-clico-mid text-lg max-w-xl mx-auto">
          O próximo passo é entender <span className="text-clico-warm-pale font-bold">por que</span> eles existem — e qual é a forma mais rápida de mudar isso na sua operação específica.
        </p>
      </div>

      {/* Bloco 3: O que acontece */}
      <div className="bg-clico-primary/40 p-8 rounded-xl border border-clico-mid/20 mb-12">
        <h3 className="font-ruda text-xl font-bold text-clico-white mb-6 uppercase tracking-wider text-center">
          No Diagnóstico Operacional de 90 min:
        </h3>
        <ul className="space-y-4 max-w-xl mx-auto">
          <li className="flex items-start">
            <Target className="w-6 h-6 text-clico-accent-cyan mr-3 flex-shrink-0" />
            <span className="text-clico-white">Análise aprofundada dos gargalos identificados no seu pré-diagnóstico.</span>
          </li>
          <li className="flex items-start">
            <Zap className="w-6 h-6 text-clico-accent-cyan mr-3 flex-shrink-0" />
            <span className="text-clico-white">Mapeamento de onde a operação está drenando margem — com dados, não achismos.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="w-6 h-6 text-clico-accent-cyan mr-3 flex-shrink-0" />
            <span className="text-clico-white">Identificação dos processos que travam o crescimento mesmo parecendo funcionar.</span>
          </li>
          <li className="flex items-start">
            <Bot className="w-6 h-6 text-clico-accent-cyan mr-3 flex-shrink-0" />
            <span className="text-clico-white">Avaliação do potencial de automação e IA aplicado ao seu negócio.</span>
          </li>
          <li className="flex items-start">
            <FileText className="w-6 h-6 text-clico-accent-cyan mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-clico-white font-bold bg-clico-accent-cyan/10 px-2 rounded">Relatório escrito com pontos críticos, prioridades e próximos passos entregue em até 48h.</span>
          </li>
        </ul>
      </div>

      {/* Bloco 4 & 5: Detalhe e CTAs */}
      <div className="max-w-xl mx-auto w-full">
        <div className="bg-gradient-to-b from-clico-primary to-clico-primary-dark p-8 rounded-2xl border border-clico-accent-cyan/30 shadow-[0_0_30px_rgba(12,192,223,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-clico-accent-cyan text-clico-primary-dark text-xs font-black uppercase px-4 py-1 rounded-bl-lg">
            Sessão Estratégica
          </div>
          
          <h3 className="font-ruda text-2xl font-black text-clico-white mb-2">Diagnóstico Operacional CLI.CO</h3>
          <p className="text-clico-warm-pale font-lexend mb-8 flex items-center">
            90 minutos <span className="mx-2 text-clico-mid">•</span> Online <span className="mx-2 text-clico-mid">•</span> + Relatório em 48h
          </p>
          
          <div className="text-4xl font-ruda font-black text-clico-white mb-8">
            R$ 297
          </div>

          <div className="space-y-4">
            <button
              onClick={handlePaymentClick}
              className="w-full flex items-center justify-center space-x-2 bg-clico-accent-cyan hover:bg-cyan-400 text-clico-primary-dark font-black py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(12,192,223,0.3)] text-lg"
            >
              <span>Quero meu Diagnóstico Operacional</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {paymentClicked && (
              <p className="text-clico-accent-cyan text-sm text-center animate-fade-in font-bold">
                Redirecionando... Após a confirmação do pagamento, você receberá o link para agendar sua sessão por e-mail.
              </p>
            )}

            <button
              onClick={handleWhatsappClick}
              className="w-full flex items-center justify-center space-x-2 bg-transparent hover:bg-clico-primary/80 border border-clico-mid/50 hover:border-clico-mid text-clico-warm-pale py-3 px-4 rounded-xl transition-colors duration-300 text-sm mt-4"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ainda tem dúvidas? Fale comigo pelo WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
