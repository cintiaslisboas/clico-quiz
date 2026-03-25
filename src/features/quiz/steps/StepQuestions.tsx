
import { useQuizStore } from '@/store/quizStore';
import { ArrowRight, ArrowLeft, BrainCircuit, Wallet, AlertTriangle, Cpu } from 'lucide-react';

const blockData = {
  1: {
    title: 'Percepção vs Realidade',
    icon: BrainCircuit,
    color: 'text-clico-accent-cyan',
  },
  2: {
    title: 'Custo do Caos',
    icon: Wallet,
    color: 'text-clico-accent-orange',
  },
  3: {
    title: 'Dependência Oculta',
    icon: AlertTriangle,
    color: 'text-clico-warm-pale',
  },
  4: {
    title: 'Maturidade Operacional + IA',
    icon: Cpu,
    color: 'text-clico-accent-cyan',
  }
};

export default function StepQuestions({ blockIndex }: { blockIndex: number }) {
  const { answers, updateAnswer, nextStep, prevStep } = useQuizStore();
  
  const block = blockData[blockIndex as keyof typeof blockData];
  const Icon = block.icon;

  const isBlockValid = () => {
    if (blockIndex === 1) {
      if (answers.q1_1 === null || answers.q1_3 === null || answers.q1_4 === null) return false;
      const q1_2 = answers.q1_2;
      if (!q1_2.fluxoCaixa && !q1_2.statusPedidos && !q1_2.gargalos && !q1_2.nenhumaDessas) return false;
    }
    if (blockIndex === 2) {
      const q2_1 = answers.q2_1;
      if (!q2_1.atrasos && !q2_1.perdaNegociacao && !q2_1.retrabalho && !q2_1.nenhum) return false;
      if (answers.q2_2 === null || answers.q2_3 === null || answers.q2_4 === null) return false;
    }
    if (blockIndex === 3) {
      if (answers.q3_1 === null || answers.q3_2 === null || answers.q3_3 === null || answers.q3_4 === null) return false;
    }
    if (blockIndex === 4) {
      if (answers.q4_1 === null || answers.q4_2 === null || answers.q4_3 === null || answers.q4_4 === null) return false;
    }
    return true;
  };

  const handleQ1_2 = (field: keyof typeof answers.q1_2) => {
    const current = { ...answers.q1_2 };
    if (field === 'nenhumaDessas') {
      updateAnswer('q1_2', { fluxoCaixa: false, statusPedidos: false, gargalos: false, nenhumaDessas: !current.nenhumaDessas });
    } else {
      updateAnswer('q1_2', { ...current, [field]: !current[field], nenhumaDessas: false });
    }
  };

  const handleQ2_1 = (field: keyof typeof answers.q2_1) => {
    const current = { ...answers.q2_1 };
    if (field === 'nenhum') {
      updateAnswer('q2_1', { atrasos: false, perdaNegociacao: false, retrabalho: false, nenhum: !current.nenhum });
    } else {
      updateAnswer('q2_1', { ...current, [field]: !current[field], nenhum: false });
    }
  };

  const renderOption = (
    label: string, 
    isSelected: boolean, 
    onClick: () => void, 
    type: 'single' | 'multi' = 'single'
  ) => (
    <div 
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 flex items-center gap-3
        ${isSelected 
          ? 'border-clico-accent-cyan bg-clico-primary shadow-[0_0_15px_rgba(12,192,223,0.15)]' 
          : 'border-clico-mid/30 hover:border-clico-mid/60 bg-clico-primary/30'}
      `}
    >
      <div className={`flex-shrink-0 flex items-center justify-center border
        ${type === 'single' ? 'w-5 h-5 rounded-full' : 'w-5 h-5 rounded'}
        ${isSelected ? 'border-clico-accent-cyan' : 'border-clico-mid'}
      `}>
        {isSelected && (
          <div className={`bg-clico-accent-cyan ${type === 'single' ? 'w-2.5 h-2.5 rounded-full' : 'w-3 h-3 rounded-[1px]'}`} />
        )}
      </div>
      <span className="text-sm md:text-base">{label}</span>
    </div>
  );

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto flex flex-col min-h-[80vh] py-8">
      {/* Header / Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 text-sm font-ruda text-clico-mid">
          <button onClick={prevStep} className="flex items-center hover:text-clico-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </button>
          <span>Bloco {blockIndex} de 4</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-clico-accent-cyan to-clico-primary transition-all duration-500 ease-out"
            style={{ width: `${(blockIndex * 25)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Icon className={`w-8 h-8 ${block.color}`} />
        <h2 className="text-2xl font-ruda font-bold">{block.title}</h2>
      </div>

      <div className="space-y-10 flex-grow">
        {blockIndex === 1 && (
          <>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Se você sair da empresa por 15 dias, o que acontece?</h3>
              {renderOption('A operação continua normalmente', answers.q1_1 === 0, () => updateAnswer('q1_1', 0))}
              {renderOption('Algumas coisas atrasam, mas segue', answers.q1_1 === 1, () => updateAnswer('q1_1', 1))}
              {renderOption('Várias áreas travam', answers.q1_1 === 2, () => updateAnswer('q1_1', 2))}
              {renderOption('Tudo para', answers.q1_1 === 3, () => updateAnswer('q1_1', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Você consegue visualizar em menos de 5 minutos: <span className="text-xs text-clico-mid font-normal block mt-1">(múltipla escolha)</span></h3>
              {renderOption('Fluxo de caixa atualizado', answers.q1_2.fluxoCaixa, () => handleQ1_2('fluxoCaixa'), 'multi')}
              {renderOption('Status dos pedidos em andamento', answers.q1_2.statusPedidos, () => handleQ1_2('statusPedidos'), 'multi')}
              {renderOption('Gargalos críticos da operação', answers.q1_2.gargalos, () => handleQ1_2('gargalos'), 'multi')}
              {renderOption('Nenhuma dessas', answers.q1_2.nenhumaDessas, () => handleQ1_2('nenhumaDessas'), 'multi')}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Quantas decisões estratégicas você adiou na última semana por falta de informação confiável?</h3>
              {renderOption('Nenhuma — tenho dados na hora que preciso', answers.q1_3 === 0, () => updateAnswer('q1_3', 0))}
              {renderOption('1 a 2 decisões', answers.q1_3 === 1, () => updateAnswer('q1_3', 1))}
              {renderOption('3 ou mais', answers.q1_3 === 2, () => updateAnswer('q1_3', 2))}
              {renderOption('Nem lembro — é rotina', answers.q1_3 === 3, () => updateAnswer('q1_3', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Hoje, sua empresa é mais:</h3>
              {renderOption('Guiada por processos claros', answers.q1_4 === 0, () => updateAnswer('q1_4', 0))}
              {renderOption('Guiada por pessoas-chave', answers.q1_4 === 2, () => updateAnswer('q1_4', 2))}
              {renderOption('Guiada por urgências', answers.q1_4 === 3, () => updateAnswer('q1_4', 3))}
            </div>
          </>
        )}

        {blockIndex === 2 && (
          <>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Nos últimos 3 meses, sua empresa teve: <span className="text-xs text-clico-mid font-normal block mt-1">(múltipla escolha)</span></h3>
              {renderOption('Atrasos em pagamentos com multa/juros', answers.q2_1.atrasos, () => handleQ2_1('atrasos'), 'multi')}
              {renderOption('Perda de negociação por falta de agilidade', answers.q2_1.perdaNegociacao, () => handleQ2_1('perdaNegociacao'), 'multi')}
              {renderOption('Retrabalho frequente por falha de comunicação', answers.q2_1.retrabalho, () => handleQ2_1('retrabalho'), 'multi')}
              {renderOption('Nenhum desses', answers.q2_1.nenhum, () => handleQ2_1('nenhum'), 'multi')}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Você consegue estimar o custo desses problemas nos últimos 3 meses?</h3>
              {renderOption('Sim, sei exatamente', answers.q2_2 === 0, () => updateAnswer('q2_2', 0))}
              {renderOption('Tenho uma ideia aproximada', answers.q2_2 === 1, () => updateAnswer('q2_2', 1))}
              {renderOption('Não faço ideia', answers.q2_2 === 3, () => updateAnswer('q2_2', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Hoje, o maior desperdício da sua operação está em:</h3>
              {renderOption('Tempo', answers.q2_3 === 2, () => updateAnswer('q2_3', 2))}
              {renderOption('Dinheiro', answers.q2_3 === 2.1, () => updateAnswer('q2_3', 2.1))} {/* Usando 2.1/2.2 apenas para diferenciar estado visual */}
              {renderOption('Energia do time', answers.q2_3 === 2.2, () => updateAnswer('q2_3', 2.2))}
              {renderOption('Não sei identificar', answers.q2_3 === 3, () => updateAnswer('q2_3', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">O crescimento da empresa hoje está sendo limitado mais por:</h3>
              {renderOption('Mercado', answers.q2_4 === 1, () => updateAnswer('q2_4', 1))}
              {renderOption('Capacidade operacional', answers.q2_4 === 2, () => updateAnswer('q2_4', 2))}
              {renderOption('Pessoas', answers.q2_4 === 2.1, () => updateAnswer('q2_4', 2.1))}
              {renderOption('Desorganização interna', answers.q2_4 === 3, () => updateAnswer('q2_4', 3))}
            </div>
          </>
        )}

        {blockIndex === 3 && (
          <>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Se 1 ou 2 pessoas-chave saírem hoje, o que acontece?</h3>
              {renderOption('Operação segue normalmente — temos processos', answers.q3_1 === 0, () => updateAnswer('q3_1', 0))}
              {renderOption('Tem impacto mas recuperamos rápido', answers.q3_1 === 1, () => updateAnswer('q3_1', 1))}
              {renderOption('Sentimos muito, leva semanas para normalizar', answers.q3_1 === 2, () => updateAnswer('q3_1', 2))}
              {renderOption('Seria um desastre', answers.q3_1 === 3, () => updateAnswer('q3_1', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Seu processo crítico mais importante está:</h3>
              {renderOption('Documentado e atualizado', answers.q3_2 === 0, () => updateAnswer('q3_2', 0))}
              {renderOption('Parcialmente documentado', answers.q3_2 === 1, () => updateAnswer('q3_2', 1))}
              {renderOption('Na cabeça de alguém', answers.q3_2 === 3, () => updateAnswer('q3_2', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Quanto tempo leva para treinar alguém novo até performar bem?</h3>
              {renderOption('Menos de 2 semanas', answers.q3_3 === 0, () => updateAnswer('q3_3', 0))}
              {renderOption('2 a 4 semanas', answers.q3_3 === 1, () => updateAnswer('q3_3', 1))}
              {renderOption('1 a 3 meses', answers.q3_3 === 2, () => updateAnswer('q3_3', 2))}
              {renderOption('Mais de 3 meses — ou nunca', answers.q3_3 === 3, () => updateAnswer('q3_3', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Hoje, sua operação depende mais de:</h3>
              {renderOption('Sistemas e processos', answers.q3_4 === 0, () => updateAnswer('q3_4', 0))}
              {renderOption('Processos parcialmente definidos', answers.q3_4 === 1, () => updateAnswer('q3_4', 1))}
              {renderOption('Pessoas específicas', answers.q3_4 === 3, () => updateAnswer('q3_4', 3))}
            </div>
          </>
        )}

        {blockIndex === 4 && (
          <>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Você utiliza IA hoje em quais áreas?</h3>
              {renderOption('Integrada à operação central', answers.q4_1 === 0, () => updateAnswer('q4_1', 0))}
              {renderOption('Pontual — marketing, conteúdo', answers.q4_1 === 1, () => updateAnswer('q4_1', 1))}
              {renderOption('Nenhuma', answers.q4_1 === 3, () => updateAnswer('q4_1', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Se tivesse que automatizar 30% da sua operação hoje, você saberia por onde começar?</h3>
              {renderOption('Sim, tenho clareza', answers.q4_2 === 0, () => updateAnswer('q4_2', 0))}
              {renderOption('Tenho ideia mas não sei como executar', answers.q4_2 === 1, () => updateAnswer('q4_2', 1))}
              {renderOption('Não saberia por onde começar', answers.q4_2 === 3, () => updateAnswer('q4_2', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Seus processos são:</h3>
              {renderOption('Claros e replicáveis', answers.q4_3 === 0, () => updateAnswer('q4_3', 0))}
              {renderOption('Parcialmente definidos', answers.q4_3 === 1, () => updateAnswer('q4_3', 1))}
              {renderOption('Improvisados', answers.q4_3 === 3, () => updateAnswer('q4_3', 3))}
            </div>
            <div className="space-y-3">
              <h3 className="font-lexend text-lg text-clico-warm-pale mb-4">Hoje, sua empresa está mais próxima de:</h3>
              {renderOption('Escalar com eficiência', answers.q4_4 === 0, () => updateAnswer('q4_4', 0))}
              {renderOption('Crescer com esforço e desgaste', answers.q4_4 === 2, () => updateAnswer('q4_4', 2))}
              {renderOption('Sobreviver no dia a dia', answers.q4_4 === 3, () => updateAnswer('q4_4', 3))}
            </div>
          </>
        )}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={nextStep}
          disabled={!isBlockValid()}
          className={`flex items-center justify-center space-x-2 px-8 py-3 rounded-lg transition-all duration-300 font-bold
            ${isBlockValid() 
              ? 'bg-clico-accent-cyan text-clico-primary-dark hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-lg shadow-clico-accent-cyan/20 cursor-pointer' 
              : 'bg-clico-mid/30 text-clico-mid cursor-not-allowed'}`}
        >
          <span>{blockIndex === 4 ? 'Avançar para Autoavaliação' : 'Próximo Bloco'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
