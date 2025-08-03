import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { LayoutContentPage } from '@/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// const signUpFormSchema = z.object({
//   restaurantName: z.string(),
//   managerName: z.string(),
//   phone: z.string(),
//   email: z.string().email(),
// })
// type SignUpFormType = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

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
              <Label htmlFor="managerName"> Nome</Label>
              <Input
                id="managerName"
                type="text"
                placeholder="Seu nome"
                {...register('managerName')}
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
              <Label htmlFor="email"> Senha</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email"> Confirme a sua senha</Label>
              <Input id="email" type="email" {...register('email')} />
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
