
import { useQuizStore } from '@/store/quizStore';
import { ArrowRight } from 'lucide-react';

export default function StepZero() {
  const nextStep = useQuizStore((state) => state.nextStep);

  return (
    <div className="flex flex-col items-center text-center space-y-8 animate-fade-in relative z-10">
      <div className="mb-8">
        <h2 className="font-ruda text-clico-accent-cyan text-xl md:text-2xl font-bold tracking-widest uppercase">
          CLI.CO
        </h2>
        <p className="text-clico-mid text-sm tracking-widest uppercase mt-1">
          Controle Operacional Inteligente
        </p>
      </div>

      <div className="max-w-2xl bg-clico-primary border border-clico-mid/20 p-8 md:p-12 rounded-xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-clico-accent-orange"></div>
        <h1 className="font-ruda text-3xl md:text-5xl font-black text-clico-white mb-6 leading-tight">
          Sua empresa cresce — mas a operação acompanha?
        </h1>
        
        <p className="font-lexend text-clico-warm-pale text-lg md:text-xl md:leading-relaxed mb-8">
          Em 5 minutos, descubra onde sua operação está vazando dinheiro e travando seu crescimento.
        </p>
        
        <button
          onClick={nextStep}
          className="group flex items-center justify-center w-full md:w-auto mx-auto space-x-2 bg-clico-accent-cyan hover:bg-cyan-400 text-clico-primary-dark font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(12,192,223,0.3)]"
        >
          <span>Iniciar diagnóstico gratuito</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
