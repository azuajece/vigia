import '@/styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import App from './App'
import JugadoresPage from '@pages/JugadoresPage'
import ConceptosPage from '@pages/ConceptosPage'
import CuotasConceptosPage from '@pages/CuotasConceptosPage'
import CuotasMensualesPage from '@pages/CuotasMensualesPage'
import FormasPagoPage from '@pages/FormasPagoPage'
import IngresosPage from '@pages/IngresosPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename="/vigia">
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Navigate to="/jugadores" replace />} />
          <Route path="/jugadores" element={<JugadoresPage />} />
          <Route path="/conceptos" element={<ConceptosPage />} />
          <Route path="/cuotas-conceptos" element={<CuotasConceptosPage />} />
          <Route path="/cuotas-mensuales" element={<CuotasMensualesPage />} />
          <Route path="/formas-pago" element={<FormasPagoPage />} />
          <Route path="/ingresos" element={<IngresosPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
