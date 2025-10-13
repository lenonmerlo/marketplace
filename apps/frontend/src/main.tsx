import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './styles/globals.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Private from './components/Private'
import Placeholder from './components/Placeholder'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Private><Placeholder title="Produtos" /></Private>} />
        <Route path="/products/new" element={<Private><Placeholder title="Novo Produto" /></Private>} />
        <Route path="/products/:id/edit" element={<Private><Placeholder title="Editar Produto" /></Private>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
