export default function LoginCard() {
  return (
    // Tarjeta:
    // - w-[420px]: ancho fijo de 420px (ajústalo)
    // - rounded-2xl: bordes redondeados grandes
    // - bg-white: fondo blanco
    // - p-8: padding interno
    // - shadow-xl: sombra marcada
    // - border border-slate-100: borde sutil
    <div className="w-[420px] rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
      {/* Título principal */}
      <h2 className="text-2xl font-semibold text-slate-900 text-center">Iniciar sesión</h2>

      {/* Subtítulo descriptivo */}
      <p className="text-sm text-slate-500 text-center mt-2">
        Accede a tu cuenta de Trasari
      </p>

      {/* Formulario (solo UI, sin lógica) */}
      <form className="mt-6 space-y-4">
        {/* Grupo: Username */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Nombre de usuario
          </label>

          {/* Input:
              - w-full: ocupa todo el ancho
              - rounded-lg: bordes
              - border-slate-300: color del borde
              - px-3 py-2: padding
              - placeholder-slate-400: color del placeholder
              - focus:ring-2 focus:ring-blue-500: anillo azul al enfocar
          */}
          <input
            type="text"
            placeholder="tu_usuario"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Grupo: Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botón primario:
            - bg-blue-600: fondo azul
            - hover:bg-blue-700 / active:bg-blue-800: estados
            - py-2.5: alto del botón
        */}
        <button
          type="button"
          className="w-full rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Acceder
        </button>
      </form>

      {/* Enlace a signup */}
      <div className="mt-6 text-center">
        <a href="/signup" className="text-sm text-blue-600 hover:underline">
          ¿No tienes cuenta? Crea una
        </a>
      </div>
    </div>
  )
}
