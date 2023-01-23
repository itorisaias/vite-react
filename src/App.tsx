import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { getUser, login } from "./services";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  age: z.number(),
  gender: z.nativeEnum(GenderEnum)
})

type Inputs = z.infer<typeof inputSchema>;

function App() {
  const queryClient = useQueryClient()
  const query = useQuery<{ username: string }>('user', getUser)
  const mutation = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      gender: GenderEnum.other,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (input) => mutation.mutate(input);

  if (query.isLoading) {
    return <span>Loading...</span>
  }

  if (query.isError) {
    return <span>Ops! Error</span>
  }

  return (
    <>
      <h1>Username: {query.data?.username}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
        </label>
        {errors.email && <span>{errors.email?.message}</span>}

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            {...register("password", { required: true, minLength: 6 })}
            aria-invalid={errors.password ? "true" : "false"}
          />
        </label>
        {errors.password && <span>{errors.password?.message}</span>}

        <label htmlFor="age">
          Age
          <input
            id="age"
            type="number"
            {...register("age", { min: 18, max: 99 })}
            aria-invalid={errors.age ? "true" : "false"}
          />
        </label>
        {errors.age && <span>{errors.age?.message}</span>}

        <label htmlFor="gender">
          Gender
          <select
            id="gender"
            {...register("gender")}
            aria-invalid={errors.gender ? "true" : "false"}
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </label>
        {errors.gender && <span>{errors.gender?.message}</span>}

        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

export default App;