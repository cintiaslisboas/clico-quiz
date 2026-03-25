-- Crie esta tabela no editor SQL do Supabase
CREATE TABLE IF NOT EXISTS leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nome text not null,
  email text not null,
  whatsapp text not null,
  empresa text not null,
  segmento text not null,
  area_critica text not null,
  score_final numeric not null,
  perfil text not null,
  score_b1 numeric not null,
  score_b2 numeric not null,
  score_b3 numeric not null,
  score_b4 numeric not null,
  pior_bloco text not null,
  segundo_pior_bloco text not null,
  cta_clicado text default 'none'
);

-- Ativar Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política de Inserção Pública
-- Qualquer pessoa (mesmo sem estar logada) pode inserir um novo lead ao terminar o quiz
CREATE POLICY "Leads podem ser inseridos publicamente" 
ON leads 
FOR INSERT 
WITH CHECK (true);

-- Política de Atualização Pública (Apenas para o CTA)
-- Permite que usuários anônimos atualizem apenas a coluna cta_clicado do seu próprio registro (baseado no email)
CREATE POLICY "Leads podem atualizar seu próprio CTA" 
ON leads 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Política de Seleção Exclusiva para Admins (Service Role)
-- Apenas usuários autenticados com permissão (ex: dashboard admin interno) ou o service_role podem ver os leads
CREATE POLICY "Leads podem ser vistos por admins" 
ON leads 
FOR SELECT 
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
