import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center items-start gap-8 p-8 lg:p-16 bg-gradient-to-b from-surface to-text-white">
        <h3 className="text-5xl font-bold text-white leading-tight">
          Bienvenido a <b className="text-primary text-6xl">Slotify</b>
        </h3>
        <p className="text-2xl text-muted font-semibold">
          Gestiona tu negocio de forma inteligente.
        </p>
        <SignIn />
      </div>
      <div></div>
    </div>
  );
};

export default SignInPage;
