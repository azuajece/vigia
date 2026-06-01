import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  label: string
  path: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Jugadores', path: '/jugadores' },
  { label: 'Conceptos Cuota', path: '/conceptos' },
  { label: 'Cuotas Conceptos', path: '/cuotas-conceptos' },
  { label: 'Cuotas Mensuales', path: '/cuotas-mensuales' },
  { label: 'Formas Pago', path: '/formas-pago' },
  { label: 'Ingresos', path: '/ingresos' },
]

export const Navbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-vigia-green to-emerald-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl hover:text-vigia-yellow transition"
          >
            <img src="/escudo.png" alt="El Vigia" className="h-14 w-14" />
            <span>El Vigia</span>
          </Link>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  location.pathname === item.path
                    ? 'bg-vigia-yellow text-vigia-green'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                  location.pathname === item.path
                    ? 'bg-vigia-yellow text-vigia-green'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
