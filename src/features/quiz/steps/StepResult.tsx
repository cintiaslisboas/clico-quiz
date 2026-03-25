
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';

export default function StepResult() {
  const { scoreResult, leadData } = useQuizStore();
  const navigate = useNavigate();

  if (!scoreResult) return null;

  const getColorByScore = (score: number) => {
    if (score < 35) return '#2ECC71';
    if (score < 60) return '#F1C40F';
    if (score < 80) return '#CD6E20';
    return '#E74C3C';
  };

  const finalColor = getColorByScore(scoreResult.scoreFinal);

  const answers = useQuizStore.getState().answers;
  const s = answers.sliders;
  const currentRadarData = [
    { subject: 'Clareza', Realidade: s.clareza, Benchmark: 7, fullMark: 10 },
    { subject: 'Eficiência', Realidade: s.eficiencia, Benchmark: 7, fullMark: 10 },
    { subject: 'Independência', Realidade: s.independencia, Benchmark: 7, fullMark: 10 },
    { subject: 'Tecnologia', Realidade: s.usoTecnologia, Benchmark: 7, fullMark: 10 },
    { subject: 'Escala', Realidade: s.capacidadeEscalar, Benchmark: 7, fullMark: 10 },
  ];

  const getProfileLabel = (perfil: string) => {
    switch(perfil) {
      case 'base_solida': return 'Base Sólida';
      case 'vulneravel': return 'Operação Vulnerável';
      case 'em_risco': return 'Operação em Risco';
      case 'critico': return 'Operação Crítica';
      default: return '';
    }
  };

  const blocks = [
    { id: 'b1', label: '1. Percepção vs Realidade', score: scoreResult.scoreB1 },
    { id: 'b2', label: '2. Custo do Caos', score: scoreResult.scoreB2 },
    { id: 'b3', label: '3. Dependência Oculta', score: scoreResult.scoreB3 },
    { id: 'b4', label: '4. Maturidade + IA', score: scoreResult.scoreB4 },
  ];

  const getCriticalPoints = () => {
    const points = [];
    if (leadData?.area_critica) {
      points.push(`Sua área principal de dor informada é o setor **${leadData.area_critica}**. Gargalos nesta área geralmente afetam o fluxo de caixa ou a entrega final.`);
    }
    if (scoreResult.piorBloco === 'b3' || scoreResult.segundoPiorBloco === 'b3') {
      points.push("⚠️ Dependência de Pessoas: Seus processos não sobrevivem sem pessoas específicas. Isso limita a escala.");
    }
    if (scoreResult.piorBloco === 'b2' || scoreResult.segundoPiorBloco === 'b2') {
      points.push("⚠️ Custo do Caos: O tempo perdido e os retrabalhos estão drenando dinheiro da sua operação silenciosamente.");
    }
    if (scoreResult.piorBloco === 'b1' || scoreResult.segundoPiorBloco === 'b1') {
      points.push("⚠️ Visibilidade: Há uma discrepância entre o que você acha que acontece e a realidade. Faltam dados confiáveis para decidir.");
    }
    if (scoreResult.piorBloco === 'b4' || scoreResult.segundoPiorBloco === 'b4') {
      points.push("⚠️ Maturidade Tecnológica: A falta de sistemas e IA está forçando sua equipe a trabalhar de forma braçal.");
    }
    return points.slice(0, 3);
  };

  const whatsappUrl = 'https://wa.me/5512992247184?text=Ol%C3%A1%20C%C3%ADntia%2C%20fiz%20o%20pr%C3%A9-diagn%C3%B3stico%20da%20CLI.CO%20e%20j%C3%A1%20sei%20o%20que%20preciso.%20Quero%20uma%20solu%C3%A7%C3%A3o%20de%20IA%20espec%C3%ADfica.';

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto flex flex-col min-h-[80vh] py-8">
      
      {/* Seção 1: Gauge Circular */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-sm font-ruda text-clico-mid mb-4 uppercase tracking-widest font-bold">Diagnóstico Concluído</h2>
        
        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#2C3E50" strokeWidth="10" />
            <circle 
              cx="50" cy="50" r="45" fill="none" 
              stroke={finalColor} strokeWidth="10" strokeDasharray="283" 
              strokeDashoffset={283 - (283 * scoreResult.scoreFinal / 100)} 
              strokeLinecap="round" 
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-black font-ruda" style={{ color: finalColor }}>{scoreResult.scoreFinal}<span className="text-2xl">%</span></span>
            <span className="text-xs text-clico-warm-pale uppercase font-bold mt-1 tracking-wider leading-tight">Índice de<br/>Vulnerabilidade</span>
          </div>
        </div>

        <div className="px-6 py-2 rounded-full font-bold uppercase tracking-wider border" style={{ backgroundColor: `${finalColor}15`, borderColor: finalColor, color: finalColor }}>
          {getProfileLabel(scoreResult.perfil)}
        </div>
      </div>

      {/* Seção 2: Diagnóstico Textual */}
      <div className="bg-clico-primary/40 border border-clico-mid/30 rounded-xl p-6 md:p-8 mb-12 shadow-lg">
        <p className="font-lexend text-lg md:text-xl leading-relaxed text-clico-white text-center">
          {scoreResult.paragrafo}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Seção 3: Barras por Bloco */}
        <div className="bg-clico-primary/20 p-6 rounded-xl border border-clico-mid/20">
          <h3 className="font-ruda text-xl font-bold mb-6 text-clico-white">Vulnerabilidade por Área</h3>
          <div className="space-y-5">
            {blocks.map(b => (
              <div key={b.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-clico-warm-pale">{b.label}</span>
                  <span className="font-ruda font-bold" style={{ color: getColorByScore(b.score) }}>{Math.round(b.score)}%</span>
                </div>
                <div className="w-full h-2.5 bg-clico-primary border border-clico-mid/30 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${b.score}%`, backgroundColor: getColorByScore(b.score) }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção 4: Radar Chart */}
        <div className="bg-clico-primary/20 p-6 rounded-xl border border-clico-mid/20 flex flex-col">
          <h3 className="font-ruda text-xl font-bold mb-2 text-clico-white">Radar de Autoavaliação</h3>
          <p className="text-xs text-clico-mid mb-4">Sua visão vs Benchmark Saudável (7) - Maior é melhor</p>
          <div className="flex-grow min-h-[250px] -ml-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={currentRadarData}>
                <PolarGrid stroke="#536D88" opacity={0.3} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#B49B85', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                <Radar name="Benchmark" dataKey="Benchmark" stroke="#536D88" strokeWidth={2} fill="#536D88" fillOpacity={0.1} />
                <Radar name="Sua Realidade" dataKey="Realidade" stroke="#0CC0DF" strokeWidth={2} fill="#0CC0DF" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Seção 5: Pontos Críticos */}
      <div className="mb-12">
        <h3 className="font-ruda text-2xl font-bold mb-6 text-clico-accent-orange border-b border-clico-mid/20 pb-4">
          Pontos Críticos Identificados
        </h3>
        <div className="space-y-4">
          {getCriticalPoints().map((pt, i) => (
            <div key={i} className="flex items-start bg-clico-accent-orange/10 border border-clico-accent-orange/30 p-4 rounded-lg">
              <AlertCircle className="w-6 h-6 text-clico-accent-orange mr-4 flex-shrink-0 mt-0.5" />
              <p className="text-clico-white leading-relaxed">{pt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ DOIS CTAs ═══ */}
      <div className="border-t border-clico-mid/20 pt-10 pb-8 space-y-4">
        <button
          onClick={() => navigate('/oferta')}
          className="group flex items-center justify-center space-x-3 bg-clico-accent-cyan hover:bg-cyan-400 text-clico-primary-dark font-black py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(12,192,223,0.3)] w-full text-lg cursor-pointer"
        >
          <span>Quero saber o próximo passo</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 border-2 border-slate-600 text-slate-300 font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:border-green-500/50 hover:text-green-400 hover:bg-green-500/5 w-full text-lg"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Já sei o que fazer, quero uma solução de IA específica</span>
        </a>
      </div>

    </div>
  );
}
