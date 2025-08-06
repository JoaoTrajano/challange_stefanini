import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { FormMessage, LayoutContentPage } from '@/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useRegisterUser } from '@/api/auth/register-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpForm, signUpFormSchema } from '@people-management/validations'
import { toast } from 'sonner'

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  const navigate = useNavigate()
  const { mutateAsync: registerUser } = useRegisterUser()

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerUser({
        email: data.email,
        name: data.name,
        password: data.password,
      })
      toast.success('Cadastrado feito com sucesso!.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/`),
        },
      })
    } catch (error) {
      toast.error('Houve um erro ao tentar cadastrar. Tente novamente.')
    }
  }

  return (
    <LayoutContentPage titlePage="Cadastro">
      <div className="flex justify-center">
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/">Fazer Login</Link>
        </Button>
        <div className="flex w-[340px] flex-col justify-center gap-6">
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name"> Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                {...register('name')}
              />
              {errors.name && errors.name.message ? (
                <FormMessage message={errors.name.message} />
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email"> E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Seu melhor e-mail"
                {...register('email')}
              />
              {errors.email && errors.email.message ? (
                <FormMessage message={errors.email.message} />
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"> Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && errors.password.message ? (
                <FormMessage message={errors.password.message} />
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-confirm"> Confirme a sua senha</Label>
              <Input
                id="password-confirm"
                type="password"
                {...register('passwordConfirm')}
              />
              {errors.passwordConfirm && errors.passwordConfirm.message ? (
                <FormMessage message={errors.passwordConfirm.message} />
              ) : null}
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>
          </form>
        </div>
      </div>
    </LayoutContentPage>
  )
}
