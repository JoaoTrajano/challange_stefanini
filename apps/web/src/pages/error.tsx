import { useRouteError } from 'react-router-dom'

type ErrorProps = {
  message?: string
}

export function Error({ message }: ErrorProps) {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600">
        Whoops, algo deu errado...
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {message
          ? message
          : 'Um erro inesperado ocorreu. Confira os detalhes abaixo:'}
      </p>
      {error?.message && (
        <pre className="max-w-md overflow-auto rounded-lg bg-gray-100 p-4 text-sm text-red-500 dark:bg-gray-800">
          {error?.message || JSON.stringify(error, null, 2)}
        </pre>
      )}
    </div>
  )
}
