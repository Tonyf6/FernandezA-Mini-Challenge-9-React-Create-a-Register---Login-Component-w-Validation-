import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input {...register('email')} type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input {...register('password')} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        <button disabled={!isDirty || !isValid} className="btn btn-primary" type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
