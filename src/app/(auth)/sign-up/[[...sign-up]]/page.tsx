import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp 
  appearance={{
    elements: {
      formButtonPrimary: '',
      button: ''
    }
  }}
  />;
}

export default SignUpPage