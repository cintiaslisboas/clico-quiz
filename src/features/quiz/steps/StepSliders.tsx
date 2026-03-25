
import { useQuizStore } from '@/store/quizStore';
import { ArrowLeft, ArrowRight, SlidersHorizontal } from 'lucide-react';

export default function StepSliders() {
  const { answers, updateAnswer, nextStep, prevStep } = useQuizStore();
  const sliders = answers.sliders;

  const handleSlider = (field: keyof typeof sliders, value: number) => {
    updateAnswer('sliders', { ...sliders, [field]: value });
  };

  const renderSlider = (label: string, field: keyof typeof sliders) => (
    <div className="bg-clico-primary/30 p-6 rounded-lg border border-clico-mid/20 hover:border-clico-mid/50 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <label className="font-ruda font-bold text-lg">{label}</label>
        <div className="bg-clico-primary-dark w-10 h-10 flex items-center justify-center rounded-lg border border-clico-mid/40 shadow-inner">
          <span className="font-lexend font-bold text-clico-accent-cyan">{sliders[field]}</span>
        </div>
      </div>
      
      <div className="relative pt-2 pb-4">
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={sliders[field]}
          onChange={(e) => handleSlider(field, parseInt(e.target.value))}
          className="w-full h-2 bg-clico-mid/30 rounded-lg appearance-none cursor-pointer outline-none accent-clico-accent-cyan
                     hover:accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-clico-accent-cyan/50"
          style={{
            background: `linear-gradient(to right, #0CC0DF ${(sliders[field] / 10) * 100}%, rgba(83, 109, 136, 0.3) ${(sliders[field] / 10) * 100}%)`
          }}
        />
        <div className="flex justify-between text-xs text-clico-mid mt-3 uppercase tracking-wider font-bold">
          <span>0 (Crítico)</span>
          <span>10 (Excelente)</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto flex flex-col min-h-[80vh] py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 text-sm font-ruda text-clico-mid">
          <button onClick={prevStep} className="flex items-center hover:text-clico-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </button>
          <span>Autoavaliação</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="h-full bg-clico-accent-cyan w-full"></div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <SlidersHorizontal className="w-8 h-8 text-clico-accent-cyan" />
        <h2 className="text-2xl md:text-3xl font-ruda font-bold">Última Etapa: Autoavaliação</h2>
      </div>
      
      <p className="font-lexend text-clico-warm-pale text-base md:text-lg mb-8">
        Como você avalia o momento da sua empresa nas dimensões abaixo? Seja brutalmente honesto.
      </p>

      <div className="space-y-4 flex-grow">
        {renderSlider('Clareza Operacional', 'clareza')}
        {renderSlider('Eficiência dos Processos', 'eficiencia')}
        {renderSlider('Independência de Pessoas-chave', 'independencia')}
        {renderSlider('Uso de Tecnologia e IA', 'usoTecnologia')}
        {renderSlider('Capacidade de Escalar', 'capacidadeEscalar')}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={nextStep}
          className="flex items-center justify-center space-x-2 px-8 py-3 rounded-lg transition-all duration-300 font-bold bg-clico-accent-cyan text-clico-primary-dark hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-lg shadow-clico-accent-cyan/20 cursor-pointer"
        >
          <span>Ver meu diagnóstico</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
