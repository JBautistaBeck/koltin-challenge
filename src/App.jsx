import { HashRouter, Routes, Route } from 'react-router-dom';
import Cartera from './pages/Cartera.jsx';
import Presentacion from './pages/Presentacion.jsx';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Cartera />} />
        <Route path="/presentacion" element={<Presentacion />} />
      </Routes>
    </HashRouter>
  );
}
