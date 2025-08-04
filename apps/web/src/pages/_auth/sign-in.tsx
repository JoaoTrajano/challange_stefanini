import { useForm } from 'react-hook-form'

import { FormMessage, LayoutContentPage } from '@/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInForm, signInFormSchema } from '@people-management/validations'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn(data: SignInForm) {
    await signIn({ email: data.email, password: data.password }, () =>
      navigate('/app', { replace: true })
    )
  }

  useEffect(() => {
    console.log('teste')
    reset({
      email: '',
      password: '',
    })
  }, [location.key, reset])

  return (
    <LayoutContentPage titlePage="Início">
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <Button variant="ghost" asChild className="absolute top-8 right-8">
            <Link to="/sign-up">Novo cadastro</Link>
          </Button>
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Acessar painel
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <FormMessage message={errors.email.message} />}
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <FormMessage message={errors.password.message} />
              )}
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </LayoutContentPage>
  )
}
