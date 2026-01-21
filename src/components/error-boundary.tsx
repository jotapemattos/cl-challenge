import { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <main className="w-full h-full min-h-screen bg-background flex items-center justify-center font-roboto px-4 md:px-12">
          <div className="w-full md:w-[600px] xl:w-[800px] min-h-screen flex flex-col items-center gap-6 bg-white pb-6">
            <header className="w-full lg:w-full h-20 bg-brand flex items-center justify-start px-4 md:px-9">
              <h1 className="text-xl font-bold text-white">CodeLeap Network</h1>
            </header>
            <section className="px-4 md:px-9 w-full flex flex-col items-center justify-center gap-4 py-12">
              <h2 className="text-2xl font-bold text-gray-800">
                Something went wrong
              </h2>
              <p className="text-base text-gray-600 text-center">
                An unexpected error occurred. Please try again.
              </p>
              <button
                onClick={this.handleRetry}
                className="mt-4 px-6 py-2 bg-brand text-white font-bold rounded hover:opacity-90 transition-opacity"
              >
                Try again
              </button>
            </section>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
