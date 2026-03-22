import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-black text-primary mb-4">404</div>
      <h1 className="text-3xl font-bold text-white mb-2">Страница не найдена</h1>
      <p className="text-gray-400 mb-8">Такой страницы не существует или она была удалена</p>
      <Link to="/" className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-full transition-colors">
        На главную
      </Link>
    </div>
  )
}
