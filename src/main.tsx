import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import { Toaster } from 'sonner'
import App from './App.tsx'
import { ErrorBoundary } from './components/error-boundary.tsx'
import { ProtectedRoute } from './components/protected-route.tsx'
import { PublicRoute } from './components/public-route.tsx'
import { SignUp } from './pages/sign-up.tsx'

const queryClient = new QueryClient()

// biome-ignore lint/style/noNonNullAssertion: default from react
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
