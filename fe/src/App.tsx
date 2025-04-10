import { Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage';
import { OffCanvasProvider } from './components/offcanvas/OffCanvasContext';

function App() {
  return (
    <OffCanvasProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </OffCanvasProvider>
  );
}

export default App;
