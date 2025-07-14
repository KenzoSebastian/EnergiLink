import { RegisterForm } from "@/components/shared/form/RegisterForm";
import { Logo } from "@/components/shared/Logo";
import {
  registerSchema,
  type RegisterSchemaValue,
} from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { hashPassword } from "@/lib/bcript";

const RegisterPage = () => {
  const registerForm = useForm<RegisterSchemaValue>({
    resolver: zodResolver(registerSchema),
  });

  const pelanggan = useMutation(api.tables.pelanggan.createPelanggan);

  const handleSubmitForm = async ({
    username,
    alamat,
    nomorKwh,
    email,
    password,
  }: RegisterSchemaValue) => {
    try {
      const hashingPassword = await hashPassword(password);
      await pelanggan({
        username: username,
        alamat: alamat,
        nomorKwh: nomorKwh,
        email: email,
        password: hashingPassword,
      });
    } catch (error) {
      console.error("Error creating pelanggan:", error);
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
          className="w-full object-cover md:w-1/2 md:h-screen object-right"
        />
        <div className="w-full flex flex-col items-center px-5 md:px-10 py-7">
          <Logo />
          <div className="mt-5 w-full flex-1">
            <h1 className="text-2xl font-bold text-blue-700 mb-3">Register</h1>
            <RegisterForm
              submitText="Daftar"
              form={registerForm}
              onSubmitForm={handleSubmitForm}
            />
            <p className="text-sm mt-3 flex flex-col items-center">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-bold text-blue-900">
                Login disini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
