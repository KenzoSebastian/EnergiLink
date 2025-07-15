import { LoginForm } from "@/components/shared/form/LoginForm";
import { Logo } from "@/components/shared/Logo";
import { verifyPassword } from "@/lib/bcript";
import { loginSchema, type LoginSchemaValue } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";

const LoginPage = () => {
  const getUser = useMutation(api.tables.user.getUserByEmail);
  const loginForm = useForm<LoginSchemaValue>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = async(data: LoginSchemaValue) => {
    const user = await getUser({ email: data.email });
    if (!user) {
      toast.error("Email atau password salah");
      return;
    }
    if (await verifyPassword(data.password, user.password)) {
      signIn("credentials", { ...data, role: user.role });
    } else {
      toast.error("Email atau password salah");
      
    }
  };

  
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col max-w-2xl h-full md:flex-row md:max-w-7xl">
        <Image
          src="/bg-auth.png"
          alt="bg"
          width={500}
          height={500}
          priority={true}
          className="w-full object-cover md:w-1/2 md:h-screen object-right md:order-2"
        />
        <div className="w-full flex flex-col items-center px-5 md:px-10 py-7">
          <Logo />
          <div className="mt-5 w-full flex-1">
            <h1 className="text-2xl font-bold text-blue-700 mb-3">Login</h1>
            <LoginForm submitText="Login" form={loginForm} onSubmitForm={handleSubmitForm}/>
            <p className="text-sm mt-3 flex flex-col items-center">
              Belum punya akun?{" "}
              <Link href="/register" className="font-bold text-blue-900">
                Daftar disini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
