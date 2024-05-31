import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange"
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input {...register('firstName')} type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} id="firstName" />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input {...register('lastName')} type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} id="lastName" />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input {...register('confirmPassword')} type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
        </div>
        <button disabled={!isDirty || !isValid} className="btn btn-primary" type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
