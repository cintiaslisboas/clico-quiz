
import { useQuizStore } from '@/store/quizStore';
import StepZero from './steps/StepZero';
import StepQuestions from './steps/StepQuestions';
import StepSliders from './steps/StepSliders';
import StepProcessing from './steps/StepProcessing';
import StepGate from './steps/StepGate';
import StepResult from './steps/StepResult';

export default function QuizFlow() {
  const currentStep = useQuizStore((state) => state.currentStep);

  return (
    <div className="min-h-screen bg-clico-primary-dark text-clico-white font-roboto selection:bg-clico-accent-cyan selection:text-clico-primary-dark">
      <div className="max-w-screen-md mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        {currentStep === 0 && <StepZero />}
        {currentStep >= 1 && currentStep <= 4 && <StepQuestions blockIndex={currentStep} />}
        {currentStep === 5 && <StepSliders />}
        {currentStep === 6 && <StepProcessing />}
        {currentStep === 7 && <StepGate />}
        {currentStep === 8 && <StepResult />}
      </div>
    </div>
  );
}
