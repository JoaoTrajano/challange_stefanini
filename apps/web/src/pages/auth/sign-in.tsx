import { zodResolver } from '@hookform/resolvers/zod'
import { SignInForm, signInFormSchema } from '@people-management/validations'
import { useForm } from 'react-hook-form'

import { FormMessage, LayoutContentPage } from '@/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
  })

  return (
    <LayoutContentPage titlePage="Início">
      <div className="w-full p-4 sm:p-8">
        <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(() => {})}>
            <div className="space-y-2">
              <Label htmlFor="username">E-mail</Label>
              <Input id="username" type="text" {...register('username')} />

              {errors.username && errors.username.message ? (
                <FormMessage message={errors.username.message} />
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && errors.password.message ? (
                <FormMessage message={errors.password.message} />
              ) : null}
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
