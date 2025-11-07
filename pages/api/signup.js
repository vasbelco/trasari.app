import { createClient } from "@supabase/supabase-js";

// Variables desde Vercel (Settings → Environment Variables)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

// Cliente administrador con service_role (no exponer en frontend)
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { company_name, company_slug, email, password, name, phone } = req.body || {};
  if (!company_name || !email || !password || !name)
    return res.status(400).json({ error: "Faltan campos requeridos" });

  try {
    // 1) Crear usuario en Auth
    const { data: created, error: authErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, phone },
      email_confirm: true
    });
    if (authErr || !created?.user) throw authErr || new Error("Error al crear usuario");

    const auth_uid = created.user.id;

    // 2) Crear empresa
    const { data: companyRow, error: compErr } = await supabaseAdmin
      .from("companies")
      .insert([{ name: company_name, slug: company_slug || null }])
      .select("id")
      .single();
    if (compErr || !companyRow?.id) throw compErr || new Error("Error al crear empresa");

    const company_id = companyRow.id;

    // 3) Crear app_user (owner)
    const { error: appUserErr } = await supabaseAdmin
      .from("app_users")
      .insert([{ company_id, auth_uid, email, name, phone: phone || null, role: "owner" }]);
    if (appUserErr) throw appUserErr;

    return res.status(200).json({ ok: true, company_id, auth_uid });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Error interno" });
  }
}
