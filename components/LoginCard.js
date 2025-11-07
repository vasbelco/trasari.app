export default function LoginCard() {
  return (
    <div style={{
      width: '400px',
      margin: '80px auto',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      background: 'white'
    }}>
      <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Iniciar sesión</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <input type="email" placeholder="Nombre de usuario" style={{padding: '10px', border: '1px solid #ccc', borderRadius: '8px'}} />
        <input type="password" placeholder="Contraseña" style={{padding: '10px', border: '1px solid #ccc', borderRadius: '8px'}} />
        <button style={{padding: '10px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
          Acceder
        </button>
      </div>
    </div>
  )
}
