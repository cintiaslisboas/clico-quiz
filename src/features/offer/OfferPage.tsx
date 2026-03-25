import { useEffect, useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { 
  ArrowRight, MessageCircle, CheckCircle2, AlertTriangle, 
  BarChart3, Layers, Cpu, Eye, TrendingUp, Zap,
  FileSearch, PenTool, Rocket
} from 'lucide-react';

export default function OfferPage() {
  const { scoreResult } = useQuizStore();
  const [isFromQuiz, setIsFromQuiz] = useState(false);

  useEffect(() => {
    if (scoreResult && scoreResult.scoreFinal > 0) {
      setIsFromQuiz(true);
    }
  }, [scoreResult]);

  const paymentUrl = import.meta.env.VITE_URL_PAGAMENTO || 'https://checkout.nubank.com.br/tklN8xuaHEzmpoc';
  const whatsappUrl = 'https://wa.me/5512992247184?text=Ol%C3%A1%20C%C3%ADntia%2C%20fiz%20o%20pr%C3%A9-diagn%C3%B3stico%20da%20CLI.CO%20e%20quero%20saber%20mais%20sobre%20o%20Diagn%C3%B3stico%20Operacional.';

  const getScoreColor = () => {
    if (!scoreResult) return 'text-cyan-400';
    if (scoreResult.scoreFinal <= 25) return 'text-emerald-400';
    if (scoreResult.scoreFinal <= 50) return 'text-yellow-400';
    if (scoreResult.scoreFinal <= 75) return 'text-orange-400';
    return 'text-red-400';
  };

  const getProfileLabel = () => {
    if (!scoreResult) return '';
    const labels: Record<string, string> = {
      'base_solida': 'Base Sólida',
      'atencao': 'Atenção',
      'alerta': 'Alerta',
      'critico': 'Crítico'
    };
    return labels[scoreResult.perfil] || scoreResult.perfil;
  };

  const dores = [
    {
      icon: <Eye className="w-7 h-7" />,
      title: 'Falta de Visibilidade',
      desc: 'Diretores pedem relatórios manualmente. Decisões baseadas em informações incompletas.',
      impact: 'Decisões lentas e riscos invisíveis.'
    },
    {
      icon: <Layers className="w-7 h-7" />,
      title: 'Processos Fragmentados',
      desc: 'Cada área opera de um jeito. Dependência de pessoas-chave para explicar como as coisas funcionam.',
      impact: 'Dificuldade de escalar e retrabalho constante.'
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: 'Planilhas Desconectadas',
      desc: 'Informações espalhadas. Dados duplicados. Equipes atualizando manualmente em vários lugares.',
      impact: 'Erros de informação e perda de tempo operacional.'
    },
    {
      icon: <AlertTriangle className="w-7 h-7" />,
      title: 'Processos Lentos',
      desc: 'Aprovações demoradas, tarefas repetitivas, dependência de e-mails para andamento.',
      impact: 'Baixa produtividade e equipes sobrecarregadas.'
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: 'Crescimento Travado',
      desc: 'Mais pessoas, mais ferramentas, mais processos improvisados. A empresa cresceu, mas a operação não acompanhou.',
      impact: 'Crescimento desacelera, erros e retrabalho aumentam.'
    }
  ];

  const esteira = [
    {
      step: '01',
      icon: <FileSearch className="w-10 h-10" />,
      title: 'Diagnóstico',
      subtitle: 'Entender o sistema atual',
      desc: 'Mapeamos como a empresa realmente opera hoje, identificando gargalos, retrabalho e falta de visibilidade.',
      entregaveis: [
        'Mapa do Sistema Operacional da Empresa',
        'Identificação de gargalos e perdas de eficiência',
        'Oportunidades de automação e integração',
        'Apresentação executiva com recomendações'
      ],
      prazo: '2 a 3 semanas'
    },
    {
      step: '02',
      icon: <PenTool className="w-10 h-10" />,
      title: 'Arquitetura',
      subtitle: 'Desenhar o sistema ideal',
      desc: 'Desenhamos o modelo operacional ideal, estruturando processos, decisões e integrações para suportar crescimento.',
      entregaveis: [
        'Blueprint do Sistema Operacional',
        'Arquitetura de processos padronizados',
        'Mapa de automações e integrações',
        'Roadmap de implementação'
      ],
      prazo: '4 a 6 semanas'
    },
    {
      step: '03',
      icon: <Rocket className="w-10 h-10" />,
      title: 'Implementação',
      subtitle: 'Tornar o sistema real — [IA]gilize',
      desc: 'Implementamos a arquitetura, automatizando processos e conectando ferramentas com inteligência artificial.',
      entregaveis: [
        'Automação de processos prioritários',
        'Integração entre sistemas e ferramentas',
        'Dashboards executivos e visibilidade operacional',
        'Agentes de IA para tarefas operacionais'
      ],
      prazo: '6 a 12 semanas'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-roboto selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-20 text-center">
          {isFromQuiz && scoreResult ? (
            <>
              <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-400">Resultado do seu Pré-Diagnóstico</span>
              </div>
              <div className={`text-7xl md:text-8xl font-ruda font-black mb-4 ${getScoreColor()}`}>
                {scoreResult.scoreFinal.toFixed(0)}%
              </div>
              <div className="text-2xl font-ruda font-bold text-white mb-2">
                Perfil: <span className={getScoreColor()}>{getProfileLabel()}</span>
              </div>
              <p className="font-lexend text-xl text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
                Sua operação apresenta sinais claros de oportunidade de melhoria. 
                O próximo passo é <strong className="text-white">entender profundamente</strong> o que está travando seu crescimento.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-400">CLI.CO — Inteligência Operacional</span>
              </div>
              <h1 className="font-ruda text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                Transformamos operações caóticas<br/>
                em um <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">sistema operacional inteligente.</span>
              </h1>
              <p className="font-lexend text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Empresas crescem, mas suas operações raramente evoluem na mesma velocidade. 
                Processos se fragmentam, decisões ficam lentas e a visibilidade se perde.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href={paymentUrl}
              className="group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(12,192,223,0.3)] hover:scale-105 active:scale-95 text-lg"
            >
              Agendar Diagnóstico — R$ 297
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-slate-600 text-slate-300 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:border-green-500/50 hover:text-green-400 hover:bg-green-500/5 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Tenho dúvidas
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ DORES ═══════ */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-ruda text-3xl md:text-4xl font-black text-white mb-4">
              Sua empresa cresce.<br/>
              <span className="text-slate-500">A operação, nem sempre.</span>
            </h2>
            <p className="font-lexend text-lg text-slate-400 max-w-xl mx-auto">
              Qual desses sintomas você reconhece no dia a dia?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dores.map((dor, i) => (
              <div 
                key={i} 
                className="group bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-slate-800/60 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-cyan-500/20 transition-colors">
                  {dor.icon}
                </div>
                <h3 className="font-ruda text-lg font-bold text-white mb-2">{dor.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{dor.desc}</p>
                <div className="flex items-start gap-2 text-orange-400/80 text-xs font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{dor.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ESTEIRA SIO ═══════ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-5 py-2 mb-6">
              <span className="text-sm font-bold text-cyan-400">Método [IA]gilize</span>
            </div>
            <h2 className="font-ruda text-3xl md:text-4xl font-black text-white mb-4">
              Do caos à ordem inteligente
            </h2>
            <p className="font-lexend text-lg text-slate-400 max-w-2xl mx-auto">
              Nosso framework <strong className="text-cyan-400">SIAO</strong> (Sistema de Inteligência Artificial Operacional) 
              transforma sua operação em três etapas.
            </p>
          </div>

          <div className="space-y-8">
            {esteira.map((item, i) => (
              <div 
                key={i}
                className="group relative bg-slate-800/30 border border-slate-700/30 rounded-2xl p-8 md:p-10 hover:border-cyan-500/20 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex items-center gap-4 md:w-64 shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-cyan-400 font-bold tracking-widest mb-1">ETAPA {item.step}</div>
                      <h3 className="font-ruda text-xl font-black text-white">{item.title}</h3>
                      <p className="text-sm text-slate-500 italic">{item.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.entregaveis.map((e, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400/70 mt-0.5 shrink-0" />
                          <span className="text-slate-300">{e}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-800/60 rounded-full px-3 py-1.5">
                      ⏱ Prazo: {item.prazo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SEÇÃO CITAÇÃO ═══════ */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-lexend text-2xl md:text-3xl text-white/90 italic leading-relaxed">
            "Empresas não precisam apenas de ferramentas.<br/>
            Elas precisam de um <span className="text-cyan-400 not-italic font-bold">sistema operacional.</span>"
          </blockquote>
          <p className="text-slate-500 mt-6 text-sm">— Cíntia, Fundadora CLI.CO</p>
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-cyan-500/20 rounded-3xl p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <h2 className="font-ruda text-3xl md:text-4xl font-black text-white mb-4">
                Pronta para dar o próximo passo?
              </h2>
              <p className="font-lexend text-lg text-slate-400 mb-8 max-w-lg mx-auto">
                Antes de automatizar, precisamos entender como a empresa realmente funciona. 
                Agende uma <strong className="text-white">Sessão Diagnóstica</strong> e receba um plano claro de ação.
              </p>

              <div className="bg-slate-900/60 rounded-2xl p-6 mb-8 border border-slate-700/30">
                <div className="text-sm text-slate-500 mb-1">Investimento</div>
                <div className="font-ruda text-4xl font-black text-white mb-1">
                  R$ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">297</span>
                </div>
                <div className="text-sm text-slate-500">Sessão diagnóstica completa</div>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={paymentUrl}
                  className="group flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold py-5 px-10 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(12,192,223,0.3)] hover:scale-105 active:scale-95 text-lg"
                >
                  Agendar minha Sessão Diagnóstica
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 border border-slate-600 text-slate-300 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:border-green-500/50 hover:text-green-400 hover:bg-green-500/5"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar com a Cíntia no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <span>© {new Date().getFullYear()} CLI.CO — Clareza e Inteligência Operacional</span>
          <span>Criadora do <strong className="text-slate-500">SIO</strong> — Sistema de Inteligência Operacional</span>
        </div>
      </footer>
    </div>
  );
}
