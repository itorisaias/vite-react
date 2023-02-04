import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "./services";
import { toast } from "react-hot-toast";
import { Button, TextField } from "./components";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  age: z.string(),
  gender: z.nativeEnum(GenderEnum),
});

type Inputs = z.infer<typeof inputSchema>;

function App() {
  // React Query
  const mutation = useMutation(login, {
    onError(error: Error, _variables, _context) {
      toast.error(`Something went wrong: ${error.message}`, { duration: 5000 })
    },
    onSuccess(_data, _variables, _context) {
      toast.success('Successfull')
    },
    onMutate(_variables) {
      toast.remove()
    },
  });

  // React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      gender: GenderEnum.other
    },
  });

  // React Hook Form + React Query
  const onSubmit: SubmitHandler<Inputs> = (input) => mutation.mutate(input);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="E-mail"
          labelFor="email"
          id="email"
          type="email"
          error={errors.email?.message}
          register={register}
        />

        <TextField
          label="Senha"
          labelFor="password"
          id="password"
          type="password"
          error={errors.password?.message}
          register={register}
        />

        <TextField
          label="Idade"
          labelFor="age"
          id="age"
          type="number"
          error={errors.age?.message}
          register={register}
        />

        {/* <label htmlFor="gender">
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
        {errors.gender && <span>{errors.gender?.message}</span>} */}

        <Button type="submit">Entrar</Button>
      </form>
    </>
  );
}

export default App;
