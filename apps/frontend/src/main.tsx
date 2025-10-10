import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Private from './components/Private'
import Placeholder from './components/Placeholder'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Placeholder title="Login" />} />
        {/* opcional: rota de cadastro (placeholder) */}
        {/* <Route path="/register" element={<Placeholder title="Cadastro" />} /> */}
        <Route path="/products" element={<Private><Placeholder title="Produtos" /></Private>} />
        <Route path="/products/new" element={<Private><Placeholder title="Novo Produto" /></Private>} />
        <Route path="/products/:id/edit" element={<Private><Placeholder title="Editar Produto" /></Private>} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
