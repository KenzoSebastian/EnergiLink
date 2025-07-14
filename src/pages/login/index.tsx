import { LoginForm } from "@/components/shared/form/LoginForm";
import { Logo } from "@/components/shared/Logo";
import { loginSchema, type LoginSchemaValue } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const navigate = useRouter();
  const session = useSession();
  const loginForm = useForm<LoginSchemaValue>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = (data: LoginSchemaValue) => {
    signIn("credentials", data);
  };

  useEffect(() => {
    console.log(session);
  }, [session]);
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
