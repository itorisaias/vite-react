import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "~/services";
import { TextField, FormWrapper, Button } from "~/components";

const inputSchema = z.object({
  email: z.string().min(1, "E-mail is required").email(),
  password: z.string().min(1, "Password is required").min(6),
});

type Inputs = z.infer<typeof inputSchema>;

function LoginPage() {
  const navigate = useNavigate();
  // React Query
  const mutation = useMutation(login, {
    onError(error: Error, _variables, _context) {
      toast.error(`Something went wrong: ${error.message}`, { duration: 5000 });
    },
    onSuccess(_data, _variables, _context) {
      toast.success("Successfull");

      navigate('/assessments?q=itor')
    },
    onMutate(_variables) {
      toast.remove();
    },
  });

  // React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
  });

  // React Hook Form + React Query
  const onSubmit: SubmitHandler<Inputs> = (input) => mutation.mutate(input);

  return (
    <FormWrapper>
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

        <Button type="submit" fullWidth>
          Entrar
        </Button>
      </form>
    </FormWrapper>
  );
}

export default LoginPage;
