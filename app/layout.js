import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PV Solar Documentation System',
  description: 'Professional solar module installation documentation generator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-solar-50 to-solar-100">
          <header className="bg-white shadow-sm border-b border-solar-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-solar-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">☀</span>
                  </div>
                  <h1 className="ml-3 text-2xl font-bold text-gray-900">
                    PV Solar Docs
                  </h1>
                </div>
                <div className="text-sm text-gray-600">
                  Professional Documentation System
                </div>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}