// SignInPage.js
import { SignIn } from "./signinform";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4 py-6 shadow-md rounded-md sm:mx-auto sm:w-[90%]">
        <SignIn />
      </div>
    </div>
  );
}
