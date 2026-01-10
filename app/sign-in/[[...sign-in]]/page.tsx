import { SignIn } from "@clerk/nextjs";
import { AnimatedBackground } from "@/src/components/animation/AnimatedBackground";

const SignInPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center items-center gap-6 lg:gap-8 p-6 sm:p-8 lg:p-16 bg-gradient-to-b from-surface to-text-white">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-center">
          Bienvenido a <b className="text-primary text-4xl sm:text-5xl lg:text-6xl">Slotify</b>
        </h3>
        <p className="text-lg sm:text-xl lg:text-2xl text-muted font-semibold text-center">
          Gestiona tu negocio de forma inteligente.
        </p>
        <SignIn />
      </div>
      <div className="relative hidden lg:flex min-h-[400px] lg:min-h-screen">
        <AnimatedBackground />
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 lg:p-16 gap-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 text-center">
            Simplifica la gestión de tu negocio con Slotify
          </h2>
          <p className="text-lg font-semibold lg:text-xl text-muted text-center max-w-md">
            Únete a Slotify hoy mismo y lleva tu negocio al siguiente nivel con
            nuestras herramientas avanzadas de gestión y análisis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
