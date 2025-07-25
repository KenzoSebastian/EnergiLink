import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const HeroSection = ({ username }: { username: string }) => {
  return (
    <div className="mt-20 md:mt-28 relative h-[calc(100vh-70px)] md:h-[calc(100vh-112px)] text-white">
      <Image
        src="/hero.jpg"
        alt="Logo"
        width={1000}
        height={500}
        className="w-full h-full absolute top-0 left-0 object-cover"
        priority
      />
      <div className="bg-black/60 absolute top-0 left-0 w-full h-full z-20">
        <div className="w-full md:w-4/5 mx-auto flex flex-col justify-center items-start h-full px-8 md:px-20 z-30">
          <h2 className="text-2xl md:text-4xl font-semibold mb-2">
            Halo {username} 👋
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            Selamat Datang di <span className="text-blue-300">EnergiLink</span>
          </h1>
          <p className="text-base md:text-2xl mb-6 text-white/90 max-w-xl drop-shadow">
            Kelola penggunaan listrik Anda dengan mudah, pantau tagihan, dan
            raih efisiensi energi bersama kami.
          </p>
          <Link href="/dashboard#penggunaan">
            <Button
              variant={"core"}
              className="text-white text-lg px-8 py-4 rounded-md shadow-lg transition"
            >
              Mulai Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
