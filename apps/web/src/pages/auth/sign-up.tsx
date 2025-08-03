import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { LayoutContentPage } from '@/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { zodResolver } from '@hookform/resolvers/zod'
import { signInFormSchema, SignUpForm } from '@people-management/validations'

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signInFormSchema),
  })

  return (
    <LayoutContentPage titlePage="Cadastro">
      <div className="flex justify-center">
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/sign-in">Fazer Login</Link>
        </Button>
        <div className="flex w-[340px] flex-col justify-center gap-6">
          <form
            onSubmit={handleSubmit(() => {
              console.log('teste')
            })}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name"> Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                {...register('name')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email"> E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Seu melhor e-mail"
                {...register('email')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"> Senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-confirm"> Confirme a sua senha</Label>
              <Input
                id="password-confirm"
                type="password"
                {...register('passwordConfirm')}
              />
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
