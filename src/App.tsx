
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizFlow from './features/quiz/QuizFlow';
import LandingPage from './features/landing/LandingPage';
import OfferPage from './features/offer/OfferPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizFlow />} />
        <Route path="/quiz" element={<QuizFlow />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/oferta" element={<OfferPage />} />
      </Routes>
    </Router>
  );
}

export default App;
