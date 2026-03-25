import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, TrendingDown, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (searchParams.get('origem') === 'quiz') {
      setShowBanner(true);
      // Rolar suavemente para a oferta se desejar
      const ofertaEl = document.getElementById('oferta');
      if (ofertaEl) {
        setTimeout(() => {
          ofertaEl.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [searchParams]);

  const handleDiagnosticoClick = () => {
    // TODO: AIOX / Supabase track click if origin=quiz
    const paymentUrl = import.meta.env.VITE_URL_PAGAMENTO || 'https://checkout.nubank.com.br/tklN8xuaHEzmpoc';
    window.location.href = paymentUrl;
  };

  const handleWhatsappClick = () => {
    window.open('https://wa.me/5512992247184?text=Ol%C3%A1+C%C3%ADntia%21+Fiz+o+pr%C3%A9-diagn%C3%B3stico+da+CLI.CO+e+tenho+uma+automa%C3%A7%C3%A3o+espec%C3%ADfica+que+quero+resolver.+Pode+me+ajudar%3F', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 font-roboto selection:bg-clico-accent-cyan selection:text-clico-primary-dark theme-light">
      
      {/* Banner Contextual */}
      {showBanner && (
        <div className="bg-clico-primary text-clico-white text-center py-3 px-4 font-bold text-sm shadow-md sticky top-0 z-50">
          Você acabou de completar seu pré-diagnóstico. Escolha como quer avançar:
        </div>
      )}

      {/* SEÇÃO 1 — Hero */}
      <section className="pt-20 pb-24 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 animate-slide-up">
          <div>
            <h1 className="font-ruda text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Da desordem à operação que escala.
            </h1>
            <div className="w-20 h-1.5 bg-clico-accent-orange mt-6 rounded-full"></div>
          </div>
          <p className="font-lexend text-xl text-slate-500 leading-relaxed">
            A CLI.CO transforma empresas do caos operacional para uma operação clara, eficiente e inteligente — com método e IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => navigate('/quiz')}
              className="flex items-center justify-center space-x-2 bg-clico-accent-cyan hover:bg-cyan-400 text-clico-primary-dark font-black py-4 px-8 rounded-lg shadow-lg shadow-clico-accent-cyan/20 transition-all transform hover:-translate-y-1"
            >
              <span>Fazer o diagnóstico gratuito</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center space-x-2 bg-transparent border-2 border-clico-primary hover:bg-clico-primary hover:text-clico-white text-clico-primary font-bold py-4 px-8 rounded-lg transition-all"
            >
              <span>Ver o Diagnóstico Completo</span>
            </button>
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          {/* Espaço para ilustração conforme PRD */}
          <div className="w-full aspect-square bg-slate-100 rounded-3xl border border-clico-mid/20 flex flex-col items-center justify-center p-8 relative overflow-hidden">
             <div className="absolute w-[150%] h-[150%] bg-gradient-to-tr from-clico-accent-cyan/10 to-transparent -top-1/4 -right-1/4 rounded-full blur-3xl"></div>
             <Settings className="w-32 h-32 text-clico-primary/10 absolute top-10 left-10" />
             <TrendingDown className="w-40 h-40 text-clico-primary/5 absolute bottom-10 right-10" />
             <div className="bg-white p-8 rounded-2xl shadow-xl z-10 w-full max-w-sm border border-clico-mid/10">
               <div className="h-4 bg-slate-100 rounded-full w-3/4 mb-4"></div>
               <div className="h-4 bg-slate-100 rounded-full w-1/2 mb-8"></div>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-clico-accent-cyan/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-clico-accent-cyan" />
                 </div>
                 <div>
                   <div className="font-ruda font-bold text-clico-primary mb-1">Operação Escalável</div>
                   <div className="text-xs text-slate-500">Processos automatizados</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — O Problema */}
      <section className="py-24 bg-slate-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-ruda text-3xl md:text-5xl font-black text-slate-900">
              Sua empresa cresce.<br/><span className="text-clico-mid">A operação, nem sempre.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚙️', title: 'Processos na cabeça das pessoas', text: 'Sem documentação, cada saída vira uma crise — e o crescimento depende de quem não pode sair.' },
              { icon: '📉', title: 'Decisões sem dados confiáveis', text: 'O gestor decide no feeling porque a informação certa nunca chega na hora certa.' },
              { icon: '🔄', title: 'Crescimento que multiplica o caos', text: 'Quanto mais vende, mais retrabalho, mais urgências e menos margem. O problema não é o mercado.' },
            ].map((card, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-clico-mid/10 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-6">{card.icon}</div>
                <h3 className="font-ruda text-xl font-bold text-slate-900 mb-4">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — O Método CLI.CO */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-ruda text-3xl md:text-5xl font-black text-slate-900 mb-4">Controle Operacional Inteligente</h2>
          <p className="font-lexend text-xl text-slate-500 mb-20 max-w-2xl mx-auto">
            Três etapas para sair do caos e construir uma operação que escala.
          </p>

          <div className="relative">
            <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-1 bg-clico-accent-orange/30"></div>
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: '01', title: 'DIAGNÓSTICO', desc: 'Mapear onde a operação perde dinheiro hoje' },
                { step: '02', title: 'ESTRUTURAÇÃO', desc: 'Processos claros, replicáveis e documentados' },
                { step: '03', title: 'INTELIGÊNCIA', desc: 'IA integrada à operação — escala sem atrito' },
              ].map((item, i) => (
                <div key={i} className="bg-white px-6">
                  <div className="w-20 h-20 mx-auto bg-clico-primary text-white font-ruda font-black text-2xl flex items-center justify-center rounded-2xl mb-6 border-b-4 border-clico-accent-cyan shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-ruda text-xl font-bold text-slate-900 mb-3 tracking-wide">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — Oferta */}
      <section id="oferta" className="py-24 px-4 bg-clico-primary text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-ruda text-3xl md:text-5xl font-black mb-4">Por onde você quer começar?</h2>
            <p className="font-lexend text-xl text-clico-accent-cyan">Dois formatos, uma mesma direção: operação que funciona.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Card Upsell */}
            <div className="relative bg-clico-primary-dark border-2 border-clico-accent-cyan rounded-2xl p-8 shadow-[0_10px_40px_rgba(12,192,223,0.15)] flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-clico-accent-cyan text-clico-primary-dark text-xs font-black uppercase px-4 py-1.5 rounded-bl-lg">
                Mais completo
              </div>
              <h3 className="font-ruda text-2xl font-black text-white mb-2 pr-28">DIAGNÓSTICO OPERACIONAL CLI.CO</h3>
              <p className="text-clico-warm-pale text-sm mb-8">Para quem quer resolver o problema na raiz.</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {['Análise aprofundada dos gargalos', 'Mapeamento de onde a margem está indo', 'Plano de estruturação com IA', 'Relatório escrito entregue em 48h'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-clico-accent-cyan mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-700 pt-6 mb-6">
                <div className="text-sm text-gray-400 mb-1">90 min · Online</div>
                <div className="text-4xl font-ruda font-black text-white">R$ 297</div>
              </div>

              <button 
                onClick={handleDiagnosticoClick}
                className="w-full flex items-center justify-center bg-clico-accent-cyan hover:bg-cyan-400 text-clico-primary-dark font-black py-4 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(12,192,223,0.2)]"
              >
                <span>Quero o Diagnóstico Completo</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Card Downsell */}
            <div className="bg-clico-primary-dark border-2 border-clico-accent-orange/80 rounded-2xl p-8 flex flex-col">
              <h3 className="font-ruda text-xl font-bold text-white mb-2">CONVERSA SOBRE AUTOMAÇÃO ESPECÍFICA</h3>
              <p className="text-gray-400 text-sm mb-8">Para quem tem uma dor pontual e quer resolver agora.</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start">
                  <span className="text-xl mr-3 flex-shrink-0">💬</span>
                  <span className="text-gray-300">Conversa direta com a Cíntia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-3 flex-shrink-0">⚡</span>
                  <span className="text-gray-300">Sem compromisso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-3 flex-shrink-0">🎯</span>
                  <span className="text-gray-300">Foco no seu processo específico</span>
                </li>
              </ul>

              <div className="border-t border-gray-700 pt-6 mb-6 text-4xl font-ruda font-black text-white">
                Gratuito
              </div>

              <button 
                onClick={handleWhatsappClick}
                className="w-full flex items-center justify-center bg-transparent border-2 border-clico-accent-orange hover:bg-clico-accent-orange text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                <span>Conversar sobre uma automação</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — Sobre a Cíntia */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-48 h-48 lg:w-72 lg:h-72 bg-clico-bg-secondary rounded-full flex items-center justify-center border-4 border-clico-primary/10 flex-shrink-0 overflow-hidden shadow-inner">
             {/* Placeholder para foto da Cíntia */}
             <span className="font-ruda font-black text-6xl text-clico-primary/20">CX</span>
          </div>
          <div>
            <h2 className="font-ruda text-3xl font-black text-clico-text-primary mb-6 border-b-2 border-clico-accent-orange inline-block pb-2">Quem está do outro lado</h2>
            <p className="font-lexend text-lg text-clico-text-body leading-relaxed mb-6">
              "Sou a Cíntia, founder da CLI.CO. Trabalho com empresas que cresceram rápido demais para o próprio sistema suportar — e que precisam de clareza operacional para escalar sem quebrar."
            </p>
            <p className="font-lexend text-lg text-clico-text-body leading-relaxed">
              "Meu método combina gestão de processos, inteligência operacional e IA para transformar operações caóticas em sistemas que funcionam sem depender de você em tudo."
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — CTA Final */}
      <section className="py-24 px-4" style={{ backgroundColor: 'var(--bg-warm)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-ruda text-3xl md:text-5xl font-black text-clico-primary mb-4">Sua operação não vai se organizar sozinha.</h2>
          <p className="font-lexend text-xl text-clico-text-body mb-10">Quanto mais você espera, mais caro fica resolver.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleDiagnosticoClick}
              className="bg-clico-primary hover:bg-clico-primary-dark text-clico-white font-black py-4 px-8 rounded-lg transition-colors shadow-lg"
            >
              Quero o Diagnóstico Operacional →
            </button>
            <button 
              onClick={() => navigate('/quiz')}
              className="bg-transparent border-2 border-clico-primary hover:bg-clico-primary hover:text-white text-clico-primary font-bold py-4 px-8 rounded-lg transition-colors"
            >
              Fazer o pré-diagnóstico gratuito →
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — Rodapé */}
      <footer className="bg-clico-primary-dark text-clico-mid py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="font-ruda text-xl font-bold text-clico-white mb-2">CLI.CO</div>
            <div className="text-sm">Controle Operacional Inteligente</div>
          </div>
          
          <div className="flex gap-6 text-sm font-bold">
            <button onClick={() => navigate('/quiz')} className="hover:text-clico-white transition-colors">Quiz gratuito</button>
            <button onClick={() => document.getElementById('oferta')?.scrollIntoView()} className="hover:text-clico-white transition-colors">Diagnóstico</button>
            <a href="https://wa.me/5512992247184" target="_blank" rel="noreferrer" className="hover:text-clico-white transition-colors">WhatsApp</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-xs mt-12 opacity-50">
          © {new Date().getFullYear()} CLI.CO. Todos os direitos reservados.
        </div>
      </footer>

    </div>
  );
}
