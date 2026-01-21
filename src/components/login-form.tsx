import { Button } from '@base-ui/react/button'
import { Field } from '@base-ui/react/field'
import { Form } from '@base-ui/react/form'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import z from 'zod'
import { useAuth } from '../hooks/use-auth'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginForm() {
  const { control, handleSubmit, watch } = useForm<LoginSchema>({
    defaultValues: {
      username: '',
    },
  })
  const { login } = useAuth()
  const navigate = useNavigate()

  const username = watch('username')

  function submitLogin(values: LoginSchema) {
    login(values.username)
    navigate('/')
  }

  return (
    <Form
      className="flex w-full items-end justify-between flex-col gap-4"
      onSubmit={handleSubmit(submitLogin)}
    >
      <Controller
        name="username"
        control={control}
        rules={{
          required: 'This field is required.',
          minLength: { value: 3, message: 'At least 3 characters.' },
        }}
        render={({
          field: { ref, name, value, onBlur, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field.Root
            name={name}
            invalid={invalid}
            touched={isTouched}
            dirty={isDirty}
            className="w-full flex flex-col gap-1"
          >
            <Field.Label className="text-base">
              Please enter your username
            </Field.Label>
            <Field.Control
              className="border border-foreground rounded-lg h-8 w-full px-4 placeholder:text-muted-foreground text-sm"
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
              placeholder="John Doe"
            />
            <Field.Error className="text-red-500 text-xs" match={!!error}>
              {error?.message}
            </Field.Error>
          </Field.Root>
        )}
      />
      <Button
        type="submit"
        disabled={!username || username.trim().length === 0}
        className="text-base text-white uppercase font-bold bg-brand rounded-lg text-center h-8 w-full sm:w-28 hover:brightness-90 cursor-pointer transition-all duration-300 float-right disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
      >
        Enter
      </Button>
    </Form>
  )
}
