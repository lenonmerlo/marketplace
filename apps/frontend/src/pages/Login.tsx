import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import Title from "../assets/Title.png";
import Bg from "../assets/Background.png";
import IconMail from "../assets/icons/icon-mail.png";
import IconPass from "../assets/icons/icon-password.png";
import view from "../assets/icons/view.png";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    // TODO: integrar com /auth/login
    navigate("/products");
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* ESQUERDA */}
          <section className="md:col-span-7">
            {/* apenas a marca (texto já na imagem) */}
            <div className="mb-8">
              <img
                src={Title}
                alt="Marketplace — Painel de Vendedor"
                className="h-10 md:h-12 w-auto"
              />
            </div>

            {/* hero box na mesma cor do fundo do PNG */}
            <div className="relative rounded-[28px] bg-[var(--color-shape)] p-4 md:p-6 overflow-hidden">
              <img
                src={Bg}
                alt="Ilustração Marketplace"
                className="w-full h-auto object-contain"
                draggable={false}
              />
            </div>
          </section>

          {/* DIREITA */}
          <section className="md:col-span-5">
            <div className="login-card  ">
              <header className="mb-6">
                <h2 className="text-[22px] font-semibold">Acesse sua conta</h2>
                <p className="text-sm text-[#6b7280] mt-1">
                  Informe seu e-mail e senha para entrar
                </p>
              </header>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* E-MAIL */}
                <div>
                  <label className="block text-[12px] tracking-wide text-[#6b7280] mb-2">
                    E-MAIL
                  </label>
                  <div className="relative">
                    {/* reserva de área para o ícone */}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center opacity-70">
                      <img src={IconMail} alt="" className="w-5 h-5" />
                    </span>

                    <input
                      type="email"
                      placeholder="Seu e-mail cadastrado"
                      {...register("email")}
                      className="input pl-14 pr-0"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[13px] text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* SENHA */}
                <div>
                  <label className="block text-[12px] tracking-wide text-[#6b7280] mb-2">
                    SENHA
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center opacity-70">
                      <img src={IconPass} alt="" className="w-5 h-5" />
                    </span>

                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Sua senha de acesso"
                      {...register("password")}
                      className="input pl-14 pr-10"
                    />

                    {/* olhinho */}
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-md
                                 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/10"
                      aria-label={showPass ? "Esconder senha" : "Mostrar senha"}
                    >
                      <img src={view} alt="" className="w-5 h-5" />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[13px] text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* BOTÕES E TEXTOS */}
                <div className="space-y-5">
                  {/* Acessar — com seta à direita */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full relative !justify-start pl-[20px] pr-[56px]"
                  >
                    <span>Acessar</span>
                    <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                  </button>

                  {/* Texto + Cadastrar com seta */}
                  <div className="mt-[131px]">
                    <p className="text-sm text-[#6b7280] mt-5 mb-">
                      Ainda não tem uma conta?
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline w-full relative !justify-start pl-[20px] pr-[56px]"
                    >
                      <span>Cadastrar</span>
                      <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* Seta minimalista (SVG inline) */
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
