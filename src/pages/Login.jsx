import React, { useState } from "react";
import {
  Lock,
  Mail,
  LogIn,
  Trophy,
  AlertCircle
} from "lucide-react";

import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

    if (error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/20">
            <Trophy size={30} strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl font-black tracking-tight">
            XTREINO
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Gerenciador de X-Treino
          </p>

        </div>

        <div className="rounded-3xl border border-white/[0.07] bg-zinc-900/70 p-6 shadow-2xl">

          <div className="mb-6">

            <h2 className="text-xl font-black">
              Entrar
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Entre com a conta fornecida pelo administrador.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            <div>

              <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-zinc-500">
                E-mail
              </label>

              <div className="relative">

                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="usuario@email.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/[0.08] bg-zinc-950 px-10 py-3 text-sm outline-none transition focus:border-orange-500/60"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Senha
              </label>

              <div className="relative">

                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/[0.08] bg-zinc-950 px-10 py-3 text-sm outline-none transition focus:border-orange-500/60"
                />

              </div>

            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-3 text-xs font-semibold text-red-400">

                <AlertCircle size={16} />

                <span>{error}</span>

              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-black text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <LogIn size={17} />

              {loading
                ? "ENTRANDO..."
                : "ENTRAR"
              }

            </button>

          </form>

          <div className="mt-6 border-t border-white/[0.06] pt-5 text-center">

            <p className="text-[11px] text-zinc-600">
              O acesso é controlado pelo administrador.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}