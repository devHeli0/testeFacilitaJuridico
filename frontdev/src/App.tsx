import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HistoryRouter } from 'redux-first-history/rr6'

import BotaoNavegacao from './components/BotaoNavegacao'
import ClienteRoutes from './features/Cliente/ClienteRoutes'
import { history, store } from './store'

const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <HistoryRouter history={history}>
        <BotaoNavegacao />
        <Routes>
          <Route path="/*" element={<ClienteRoutes />} />
          <Route path="/" element={<Navigate to="/clientes" />} />
        </Routes>
      </HistoryRouter>
    </ReduxStoreProvider>
  )
}

export default App
