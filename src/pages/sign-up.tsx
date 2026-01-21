import LoginForm from '../components/login-form'

export function SignUp() {
  return (
    <main className="w-screen h-screen min-h-full bg-background flex items-center justify-center font-roboto text-4xl px-6 md:px-12">
      <div className="max-w-[500px] w-full mx-auto bg-white h-[205px] rounded-2xl border border-muted-foreground p-6 flex flex-col justify-between">
        <h1 className="font-bold text-lg md:text-[22px]">
          Welcome to CodeLeap network!
        </h1>
        <LoginForm />
      </div>
    </main>
  )
}
