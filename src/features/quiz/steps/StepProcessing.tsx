import { useEffect } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { Loader2 } from 'lucide-react';

export default function StepProcessing() {
  const { nextStep, calculateAndSetScore } = useQuizStore();

  useEffect(() => {
    // Calcula o score nos bastidores
    calculateAndSetScore();
    
    // Simula 2.5s de carregamento para efeito visual
    const timer = setTimeout(() => {
      nextStep();
    }, 2500);

    return () => clearTimeout(timer);
  }, [nextStep, calculateAndSetScore]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
      <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-clico-mid/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-clico-accent-cyan rounded-full border-t-transparent animate-spin"></div>
        <Loader2 className="w-10 h-10 text-clico-accent-cyan animate-pulse" />
      </div>

      <h2 className="font-ruda text-2xl md:text-4xl font-black text-clico-white mb-6">
        Analisando os padrões da sua operação...
      </h2>
      <p className="font-lexend text-clico-warm-pale text-lg md:text-xl max-w-lg">
        Identificando onde estão as maiores oportunidades de melhoria e gargalos de escala.
      </p>
    </div>
  );
}
