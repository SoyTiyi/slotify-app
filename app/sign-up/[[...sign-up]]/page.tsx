import { SignUp } from "@clerk/nextjs";
import AuthForm from "@/src/components/AuthForm/AuthForm";

const SignUpPage = () => {
  return (
    <AuthForm title="Registrate en" description="Crea tu cuenta en Slotify y comienza a gestionar tu negocio de manera eficiente.">
      <SignUp />
    </AuthForm>
  );
};

export default SignUpPage;