// Importamos la tarjeta modular (UI del formulario)
import LoginCard from '../components/LoginCard'

export default function LoginPage() {
  return (
    // Contenedor de página:
    // - min-h-screen: altura = 100% de la pantalla
    // - grid place-items-center: centra el contenido vertical/horizontal
    // - bg-slate-50: fondo gris muy claro (puedes cambiarlo)
    <main className="min-h-screen grid place-items-center bg-blue-600">
      <LoginCard />
    </main>
  )
}


// Qué cambiar aquí:
// Fondo: bg-slate-50 → bg-white, bg-gray-100, bg-slate-900 (oscuro), etc.
// Centrado: si no quieres centrar verticalmente, cambia grid place-items-center por flex justify-center.
