import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'

import Title from '../assets/Title.png'
import Bg from '../assets/Background.png'
import IconUser from '../assets/icons/icon-user.png'
import IconPhone from '../assets/icons/icon-phone.png'
import IconMail from '../assets/icons/icon-mail.png'
import IconPass from '../assets/icons/icon-password.png'
import view from '../assets/icons/view.png'

const schema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  phone: z.string().min(14, 'Telefone inválido'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
  confirm: z.string().min(6, 'Mínimo de 6 caracteres'),
}).refine(d => d.password === d.confirm, {
  message: 'As senhas não conferem',
  path: ['confirm'],
})

type FormData = z.infer<typeof schema>

function maskPhone(v: string) {
  return v.replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
}

export default function Register() {
  const nav = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_data: FormData) => {
    // TODO: POST /auth/register
    nav('/login')
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* ESQUERDA */}
          <section className="md:col-span-7">
            <div className="mb-8">
              <img src={Title} alt="Marketplace — Painel de Vendedor" className="h-10 md:h-12 w-auto" />
            </div>
            <div className="relative rounded-[28px] bg-[var(--color-shape)] p-4 md:p-6 overflow-hidden">
              <img src={Bg} alt="" className="w-full h-auto object-contain" draggable={false} />
            </div>
          </section>

          {/* DIREITA */}
          <section className="md:col-span-5">
            {/* paddings do Figma: top=72, L/R=80, bottom livre (40) */}
            <div className="login-card p-0 !pt-[72px] !pl-[80px] !pr-[80px] !pb-[40px]">

              <header className="mb-8">
                <h2 className="text-[22px] font-semibold">Crie sua conta</h2>
                <p className="text-sm text-[#6b7280] mt-1">
                  Informe os seus dados pessoais e de acesso
                </p>
              </header>

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* PERFIL */}
                <section>
                  <h3 className="text-[12px] tracking-[.12em] text-[#6b7280] mb-4 uppercase">Perfil</h3>

                  {/* card do perfil 120x120 */}
                  <div className="w-[120px] h-[120px] rounded-[16px] bg-[var(--color-shape)] grid place-items-center shadow-[0_12px_30px_rgba(0,0,0,0.06)] mb-6">
                    <img src={IconUser} alt="" className="w-8 h-8 opacity-80" />
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-[12px] tracking-wide text-[#6b7280] mb-2">NOME</label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-70">
                          <img src={IconUser} alt="" className="w-5 h-5" />
                        </span>
                        <input
                          {...register('name')}
                          placeholder="Seu nome completo"
                          className="input pl-14 pr-0"
                        />
                      </div>
                      {errors.name && <p className="text-[13px] text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-[12px] tracking-wide text-[#6b7280] mb-2">TELEFONE</label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-70">
                          <img src={IconPhone} alt="" className="w-5 h-5" />
                        </span>
                        <input
                          {...register('phone')}
                          value={watch('phone') || ''}
                          onChange={(e) => setValue('phone', maskPhone(e.target.value))}
                          placeholder="(00) 00000-0000"
                          inputMode="tel"
                          className="input pl-14 pr-0"
                        />
                      </div>
                      {errors.phone && <p className="text-[13px] text-red-500 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </section>

                {/* ACESSO — gap de 80px antes da seção */}
                <section className="!mt-[80px]">
                  <h3 className="text-[12px] tracking-[.12em] text-[#6b7280] mb-4 uppercase">Acesso</h3>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-[12px] tracking-wide text-[#6b7280] mb-2">E-MAIL</label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-70">
                          <img src={IconMail} alt="" className="w-5 h-5" />
                        </span>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="Seu e-mail de acesso"
                          className="input pl-14 pr-0"
                        />
                      </div>
                      {errors.email && <p className="text-[13px] text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-[12px] tracking-wide text-[#6b7280] mb-2">SENHA</label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-70">
                          <img src={IconPass} alt="" className="w-5 h-5" />
                        </span>
                        <input
                          {...register('password')}
                          type={showPass ? 'text' : 'password'}
                          placeholder="Senha de acesso"
                          className="input pl-14 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(v => !v)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/10"
                          aria-label={showPass ? 'Esconder senha' : 'Mostrar senha'}
                        >
                          <img src={view} alt="" className="w-5 h-5" />
                        </button>
                      </div>
                      {errors.password && <p className="text-[13px] text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                      <label className="block text-[12px] tracking-wide text-[#6b7280] mb-2">CONFIRMAR SENHA</label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-70">
                          <img src={IconPass} alt="" className="w-5 h-5" />
                        </span>
                        <input
                          {...register('confirm')}
                          type={showConfirm ? 'text' : 'password'}
                          placeholder="Confirme a senha"
                          className="input pl-14 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(v => !v)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/10"
                          aria-label={showConfirm ? 'Esconder senha' : 'Mostrar senha'}
                        >
                          <img src={view} alt="" className="w-5 h-5" />
                        </button>
                      </div>
                      {errors.confirm && <p className="text-[13px] text-red-500 mt-1">{errors.confirm.message}</p>}
                    </div>
                  </div>
                </section>

                {/* Botões */}
                <div className="mt-[32px] space-y-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full relative !justify-start pl-[20px] pr-[56px]"
                  >
                    <span>Cadastrar</span>
                    <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                  </button>

                  <div className="mt-8">
                    <p className="text-sm text-[#6b7280] mb-3">Já tem uma conta?</p>
                    <Link to="/login" className="btn btn-outline w-full relative !justify-start pl-[20px] pr-[56px]">
                      <span>Acessar</span>
                      <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
