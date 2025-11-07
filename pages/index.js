// Mini UI para probar endpoints: /api/signup, /api/login, /api/users/invite
// Este archivo sirve como `pages/index.js` para pruebas funcionales.
// Se han corregido los formularios para evitar que el cursor pierda foco al tipear.

import { useEffect, useState } from 'react';

export default function TrasariMiniUI() {
  const [token, setToken] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('trasari_token') || '';
    const c = localStorage.getItem('trasari_company_id') || '';
    const u = localStorage.getItem('trasari_user_info');
    if (t) setToken(t);
    if (c) setCompanyId(c);
    if (u) setUserInfo(JSON.parse(u));
  }, []);

  const notify = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const pretty = (obj) => JSON.stringify(obj, null, 2);

  async function callSignup(payload) {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Error en signup');
    return data;
  }

  async function callLogin(payload) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Credenciales inválidas');
    return data;
  }

  async function callInvite(companyId, payload, accessToken) {
    const res = await fetch('/api/users/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ company_id: companyId, user: payload }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Error invitando usuario');
    return data;
  }

  const [signupForm, setSignupForm] = useState({
    company_name: '',
    company_slug: '',
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [inviteForm, setInviteForm] = useState({
    email: '',
    password: '',
    user_name: '',
    name: '',
    phone: '',
    role: 'operator',
  });

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      const out = await callSignup(signupForm);
      notify('Empresa creada con éxito ✅');
      if (out?.company_id) setCompanyId(out.company_id);
    } catch (err) {
      notify(err.message || 'Error en signup', 'error');
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const out = await callLogin(loginForm);
      setToken(out.access_token);
      setCompanyId(out?.user?.company_id || '');
      setUserInfo(out?.user || null);
      localStorage.setItem('trasari_token', out.access_token);
      if (out?.user?.company_id) localStorage.setItem('trasari_company_id', out.user.company_id);
      localStorage.setItem('trasari_user_info', JSON.stringify(out.user || {}));
      notify('Sesión iniciada ✅');
    } catch (err) {
      notify(err.message || 'Error en login', 'error');
    }
  };

  const onInvite = async (e) => {
    e.preventDefault();
    try {
      if (!token) throw new Error('Inicia sesión para invitar');
      if (!companyId) throw new Error('No se detectó company_id');
      const out = await callInvite(companyId, inviteForm, token);
      notify('Usuario invitado/creado ✅');
      console.log('Invite OK', out);
    } catch (err) {
      notify(err.message || 'Error invitando usuario', 'error');
    }
  };

  const Card = ({ title, children }) => (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, background: 'white' }}>
      <h3 style={{ margin: 0, marginBottom: 12 }}>{title}</h3>
      {children}
    </div>
  );

  const Label = ({ children }) => (
    <label style={{ fontSize: 12, color: '#374151', display: 'block', marginBottom: 4 }}>{children}</label>
  );

  const Input = (props) => (
    <input {...props} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #d1d5db', marginBottom: 10 }} />
  );

  const Select = (props) => (
    <select {...props} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #d1d5db', marginBottom: 10 }} />
  );

  const Button = ({ children, ...rest }) => (
    <button {...rest} style={{ background: '#111827', color: 'white', border: 'none', padding: '10px 14px', borderRadius: 10, cursor: 'pointer' }}>{children}</button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>Trasari · Mini dashboard</h2>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            {token ? (
              <span>Sesión activa — <strong>{userInfo?.role}</strong> · company: <code>{companyId}</code></span>
            ) : (
              <span>Sin sesión</span>
            )}
          </div>
        </header>

        {toast && (
          <div style={{ background: toast.type === 'error' ? '#fee2e2' : '#ecfeff', color: toast.type === 'error' ? '#991b1b' : '#075985', border: '1px solid', borderColor: toast.type === 'error' ? '#fecaca' : '#a5f3fc', padding: '10px 12px', borderRadius: 10, marginBottom: 16 }}>
            {toast.msg}
          </div>
        )}

        {/* SIGNUP */}
        <Card title="1) Crear empresa (signup)">
          <form onSubmit={onSignup}>
            <Label>Company name</Label>
            <Input value={signupForm.company_name} onChange={(e) => setSignupForm((prev) => ({ ...prev, company_name: e.target.value }))} />
            <Label>Company slug</Label>
            <Input value={signupForm.company_slug} onChange={(e) => setSignupForm((prev) => ({ ...prev, company_slug: e.target.value }))} />
            <Label>Owner — Name</Label>
            <Input value={signupForm.name} onChange={(e) => setSignupForm((prev) => ({ ...prev, name: e.target.value }))} />
            <Label>Owner — Phone</Label>
            <Input value={signupForm.phone} onChange={(e) => setSignupForm((prev) => ({ ...prev, phone: e.target.value }))} />
            <Label>Owner — Email</Label>
            <Input type="email" value={signupForm.email} onChange={(e) => setSignupForm((prev) => ({ ...prev, email: e.target.value }))} />
            <Label>Password</Label>
            <Input type="password" value={signupForm.password} onChange={(e) => setSignupForm((prev) => ({ ...prev, password: e.target.value }))} />
            <Button type="submit">Crear empresa</Button>
          </form>
        </Card>

        {/* LOGIN */}
        <Card title="2) Login">
          <form onSubmit={onLogin}>
            <Label>Email</Label>
            <Input type="email" value={loginForm.email} onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))} />
            <Label>Password</Label>
            <Input type="password" value={loginForm.password} onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))} />
            <Button type="submit">Iniciar sesión</Button>
          </form>
          {userInfo && <pre style={{ marginTop: 12, background: '#f9fafb', padding: 12, borderRadius: 8, border: '1px solid #e5e7eb', maxHeight: 180, overflow: 'auto' }}>{pretty(userInfo)}</pre>}
        </Card>

        {/* INVITE */}
        <Card title="3) Invitar usuario">
          <form onSubmit={onInvite}>
            <Label>Rol</Label>
            <Select value={inviteForm.role} onChange={(e) => setInviteForm((prev) => ({ ...prev, role: e.target.value }))}>
              <option value="admin">admin</option>
              <option value="operator">operator</option>
              <option value="supervisor">supervisor</option>
              <option value="auditor">auditor</option>
            </Select>
            <Label>Nombre</Label>
            <Input value={inviteForm.name} onChange={(e) => setInviteForm((prev) => ({ ...prev, name: e.target.value }))} />
            <Label>user_name</Label>
            <Input value={inviteForm.user_name} onChange={(e) => setInviteForm((prev) => ({ ...prev, user_name: e.target.value }))} />
            <Label>Email</Label>
            <Input type="email" value={inviteForm.email} onChange={(e) => setInviteForm((prev) => ({ ...prev, email: e.target.value }))} />
            <Label>Teléfono</Label>
            <Input value={inviteForm.phone} onChange={(e) => setInviteForm((prev) => ({ ...prev, phone: e.target.value }))} />
            <Label>Password temporal</Label>
            <Input type="password" value={inviteForm.password} onChange={(e) => setInviteForm((prev) => ({ ...prev, password: e.target.value }))} />
            <Button type="submit">Invitar / Crear</Button>
          </form>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 10 }}>
            Necesitas sesión activa de <strong>owner/admin</strong>. Se usa el <code>company_id</code> guardado en el login.
          </div>
        </Card>

        <Card title="Estado de sesión (debug)">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <Label>access_token (localStorage)</Label>
              <textarea readOnly value={token} style={{ width: '100%', height: 120, borderRadius: 8, border: '1px solid #d1d5db', padding: 8 }} />
            </div>
            <div>
              <Label>company_id</Label>
              <Input readOnly value={companyId} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Button type="button" onClick={() => { localStorage.clear(); setToken(''); setCompanyId(''); setUserInfo(null); notify('Sesión limpia'); }}>Limpiar sesión</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
