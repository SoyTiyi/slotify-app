import { SignIn } from "@clerk/nextjs";
import AuthForm from "@/src/components/AuthForm/AuthForm";

const SignInPage = () => {
  return (
    <AuthForm title="Bienvenido a" description="Gestiona tu negocio de forma inteligente.">
      <SignIn />
    </AuthForm>
  );
};

export default SignInPage;