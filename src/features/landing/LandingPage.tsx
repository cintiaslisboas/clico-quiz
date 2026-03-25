import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  GitBranch, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Menu, 
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Componente para o Destaque visual [IA]gilize
const IAgilize = () => (
  <span className="inline-flex items-center">
    <span className="text-[var(--color-primary)] font-bold">IA</span>
    <span className="text-[var(--color-text-primary)] font-bold font-syne">gilize</span>
  </span>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const CTA_URL = "/quiz"; 

  const navLinks = [
    { name: 'Serviços', href: '#solucao' },
    { name: 'Método', href: '#como-trabalhamos' },
    { name: 'Sobre', href: '#sobre' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-primary)] selection:text-white">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/assets/logo-navy.png" alt="CliCo Logo" className="h-8 md:h-10 object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => navigate(CTA_URL)}
              className="btn-primary py-2.5 px-6 text-sm"
            >
              Pré-Diagnóstico gratuito
            </button>
          </div>

          <button className="md:hidden text-[var(--color-text-primary)]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="block text-lg font-medium text-[var(--color-text-secondary)]"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => navigate(CTA_URL)}
              className="w-full btn-primary"
            >
              Pré-Diagnóstico gratuito
            </button>
          </div>
        )}
      </nav>

      {/* SEÇÃO 1 — Hero */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden bg-slate-50/50">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dot-grid.png')] opacity-20 bg-slate-900/5"></div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-[1.2fr,0.8fr] gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-12 h-1 bg-[var(--color-primary)] mb-6"></div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 text-[var(--color-text-primary)]">
              Da desordem à operação que <span className="text-[var(--color-primary)]">escala.</span>
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-xl mb-10 leading-relaxed">
              A CLI.CO transforma empresas do caos operacional para uma operação clara, eficiente e inteligente — com método e IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => navigate(CTA_URL)} className="btn-primary text-lg px-10">
                Fazer o diagnóstico gratuito
              </button>
              <button 
                onClick={() => document.getElementById('como-trabalhamos')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-[var(--color-text-primary)] font-medium hover:text-[var(--color-primary)] transition-colors group"
              >
                Entender o método 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:block relative"
          >
            {/* SVG Abstrato de Fluxo Conectado */}
            <div className="relative p-12 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
                <svg viewBox="0 0 500 500" className="w-full h-auto">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
                <motion.path 
                    d="M100 250 C 150 100, 350 100, 400 250 S 150 400, 100 250"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <circle cx="100" cy="250" r="6" fill="#fff" stroke="var(--color-primary)" strokeWidth="2" />
                <circle cx="400" cy="250" r="6" fill="#fff" stroke="var(--color-primary)" strokeWidth="2" />
                <circle cx="250" cy="150" r="6" fill="#fff" stroke="var(--color-primary)" strokeWidth="2" />
                <circle cx="250" cy="350" r="6" fill="#fff" stroke="var(--color-primary)" strokeWidth="2" />
                
                {/* Ícone Central Animado */}
                <motion.circle 
                    cx="250" cy="250" r="30" 
                    fill="var(--color-primary)" 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <CheckCircle2 x="235" y="235" className="text-white w-8 h-8" />
                </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO 2 — O Problema */}
      <section id="problema" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-tag">O PROBLEMA</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight text-[var(--color-text-primary)]">
            Sua empresa cresce. A operação, nem sempre.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-standard border-l-[3px] border-l-[var(--color-primary)] shadow-sm">
              <GitBranch className="w-8 h-8 text-[var(--color-primary)] mb-6" />
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">Processos fragmentados</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Cada área trabalha do seu jeito. Sem padronização, sem visibilidade do todo.
              </p>
            </div>
            <div className="card-standard border-l-[3px] border-l-[var(--color-primary)] shadow-sm">
              <Clock className="w-8 h-8 text-[var(--color-primary)] mb-6" />
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">Decisões lentas</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Sem dados consolidados, decisões dependem de reuniões, achismos e planilhas desatualizadas.
              </p>
            </div>
            <div className="card-standard border-l-[3px] border-l-[var(--color-primary)] shadow-sm">
              <AlertTriangle className="w-8 h-8 text-[var(--color-primary)] mb-6" />
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">Sobrecarga do gestor</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                O founder vira gargalo. Tudo passa por ele porque o sistema não funciona sozinho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — A Solução (SIO) */}
      <section id="solucao" className="py-24 px-6 bg-[var(--color-bg-subtle)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[0.8fr,1.2fr] gap-20 items-center">
          <div>
            <div className="section-tag">A SOLUÇÃO</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[var(--color-text-primary)]">O Sistema de Inteligência Operacional (SIO)</h2>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              O SIO não é consultoria convencional. É a arquitetura viva da sua operação — um sistema que conecta o que precisa estar conectado para a empresa funcionar sem depender do heroísmo de ninguém.
            </p>
          </div>

          <div className="relative aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
            {/* SIO Diagram Hub-and-Spoke */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Central Node */}
              <div className="absolute z-20 w-32 h-32 bg-white border-2 border-[var(--color-primary)] rounded-full flex items-center justify-center shadow-xl">
                <span className="font-syne font-bold text-[var(--color-primary)] text-xl">SIO</span>
              </div>

              {/* Connecting Lines (Animadas) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <g className="opacity-20">
                  <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="20%" y2="50%" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4" />
                </g>
              </svg>

              {/* Spoke Nodes */}
              {[
                { label: 'Estratégia', pos: 'top-10 left-1/2 -ml-16' },
                { label: 'Processos', pos: 'top-1/2 left-4 -mt-10' },
                { label: 'Dados', pos: 'top-1/2 right-4 -mt-10' },
                { label: 'Decisões', pos: 'bottom-16 left-10' },
                { label: 'Automação & IA', pos: 'bottom-16 right-10' },
              ].map((node, i) => (
                <motion.div 
                  key={node.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`absolute ${node.pos} bg-white border border-slate-200 px-6 py-4 rounded-full text-sm font-bold shadow-md hover:border-[var(--color-primary)] transition-all cursor-default text-[var(--color-text-primary)]`}
                >
                  {node.label === 'Automação & IA' ? <IAgilize /> : node.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — Como Trabalhamos */}
      <section id="como-trabalhamos" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-tag">COMO TRABALHAMOS</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-20 leading-tight text-[var(--color-text-primary)]">
            Controle Operacional Inteligente
          </h2>

          <div className="grid md:grid-cols-3 gap-16 relative">
            {/* Timeline Line (Desktop) */}
            <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-1 bg-slate-100"></div>
            
            {[
              { 
                num: '01', 
                title: 'Diagnóstico', 
                desc: 'Mapeamos sua operação atual: onde está o atrito, onde está a oportunidade e o que precisa mudar primeiro.',
                entregável: 'Relatório de Diagnóstico Operacional'
              },
              { 
                num: '02', 
                title: 'Estruturação', 
                desc: 'Desenhamos o SIO customizado — processos, fluxos de decisão, estrutura de dados e mapa de automações.',
                entregável: 'Blueprint do Sistema Operacional'
              },
              { 
                num: '03', 
                title: 'Inteligência', 
                desc: 'Executamos o SIO usando o framework [IA]gilize: implementação por fases priorizadas, com entregas visíveis desde a primeira semana.',
                entregável: 'Operação funcionando'
              },
            ].map((step) => (
              <div key={step.num} className="relative z-10">
                <div className="w-20 h-20 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-syne font-bold text-2xl flex items-center justify-center rounded-2xl mb-8 shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)] uppercase tracking-tight">
                    {step.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Sub-seção [IA]gilize */}
          <div className="mt-32 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)] mb-6 font-bold">O framework de implementação</div>
                <h3 className="text-4xl md:text-6xl font-bold mb-16 px-1"><IAgilize /></h3>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
                {/* Horizontal flow line for [IA]gilize */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-[var(--color-primary)]/10"></div>
                
                {[
                    { phase: 'Priorização', desc: 'Foco no maior impacto' },
                    { phase: 'Configuração', desc: 'Ferramentas certas' },
                    { phase: 'Implementação', desc: 'Ativação de fluxos' },
                    { phase: 'Visibilidade', desc: 'Dashboards reais' },
                    { phase: 'Refinamento', desc: 'Treino e autonomia' },
                ].map((item) => (
                    <div key={item.phase} className="relative group">
                    <div className="w-6 h-6 bg-white border-2 border-[var(--color-primary)] rounded-full mb-6 relative z-10 group-hover:bg-[var(--color-primary)] transition-colors"></div>
                    <h4 className="font-bold mb-2 text-[var(--color-text-primary)] text-lg">{item.phase}</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-snug">{item.desc}</p>
                    </div>
                ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — Resultados */}
      <section id="resultados" className="py-24 px-6 bg-[var(--color-bg-subtle)]">
        <div className="max-w-7xl mx-auto">
          <div className="section-tag">RESULTADOS</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-[var(--color-text-primary)]">O que muda na sua operação.</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Clareza operacional', desc: 'Todos sabem o que fazer, como fazer e como está indo — sem depender do gestor para cada decisão.' },
              { title: 'Decisões mais rápidas', desc: 'Com dados certos e frameworks claros, decisões que levavam semanas passam a levar horas.' },
              { title: 'Operação escalável', desc: 'A operação cresce sem que o founder precise ser o gargalo de cada processo.' },
              { title: 'Menos sobrecarga', desc: 'Automações e processos claros liberam energia para o que realmente importa: crescer.' }
            ].map((card) => (
              <div key={card.title} className="card-standard hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">{card.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — Sobre */}
      <section id="sobre" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[450px,1fr] gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[var(--color-primary)]/5 rounded-3xl blur-2xl group-hover:bg-[var(--color-primary)]/10 transition-all"></div>
            <img 
              src="/assets/cintia-santos.png" 
              alt="Cíntia Santos" 
              className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl border-4 border-white"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[200px] hidden md:block">
                <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-2">Fundadora</p>
                <p className="text-sm font-medium text-[var(--color-text-primary)] leading-tight">Estrategista de Operações & IA</p>
            </div>
          </div>
          <div>
            <div className="section-tag">QUEM ESTÁ DO OUTRO LADO</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[var(--color-text-primary)]">Cíntia Santos</h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] mb-8"></div>
            
            <div className="space-y-6 text-xl text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                Estrategista de Operações com sólida experiência em Transformação Digital e IA, Cíntia Santos especializou-se em redesenhar processos complexos em setores como engenharia/construção e tecnologia.
              </p>
              <p>
                Como Founder da Cli.Co, utiliza sua expertise em Arquitetura de Inteligência Operacional para converter fluxos de trabalho obsoletos em sistemas ágeis e orientados a dados com o framework <IAgilize />. 
              </p>
              <p className="font-syne font-bold text-[var(--color-text-primary)]">
                Transformando o caos operacional em lucro e escala.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — CTA Final */}
      <section id="cta-final" className="py-32 px-6 bg-[var(--color-primary)] text-center relative overflow-hidden">
        {/* Animated Orbs for depth */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] -mr-48 -mb-48"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
            Sua operação está pronta para o próximo nível?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Faça o Pré-Diagnóstico gratuito. Em poucos minutos, mapeamos os principais pontos de atrito da sua operação e identificamos por onde começar.
            <br /><br />
            É gratuito. É estratégico. É o primeiro passo.
          </p>
          <button 
            onClick={() => navigate(CTA_URL)}
            className="bg-white text-[var(--color-primary)] text-xl font-bold py-5 px-12 rounded-xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            Fazer Pré-Diagnóstico gratuito
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <img src="/assets/logo-navy.png" alt="CliCo Logo" className="h-10 mb-6" />
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Transformando operações complexas em sistemas inteligentes e escaláveis através de arquitetura de processos e IA.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-6">
              <h4 className="text-[var(--color-text-primary)] font-bold text-sm uppercase tracking-widest">Navegação</h4>
              <div className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
                <a href="#hero" className="hover:text-[var(--color-primary)] transition-colors">Início</a>
                <a href="#solucao" className="hover:text-[var(--color-primary)] transition-colors">Serviços</a>
                <a href="#como-trabalhamos" className="hover:text-[var(--color-primary)] transition-colors">Método</a>
                <a href="#sobre" className="hover:text-[var(--color-primary)] transition-colors">Sobre</a>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-[var(--color-text-primary)] font-bold text-sm uppercase tracking-widest">Contato</h4>
              <div className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
                <a href="https://wa.me/5512992247184" className="hover:text-[var(--color-primary)] transition-colors">WhatsApp</a>
                <p>&copy; 2026 CLI.CO</p>
                <div className="pt-2">
                    <IAgilize />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
