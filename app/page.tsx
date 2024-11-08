import { SignupFormDemo } from "@/components/auth/SignupForm";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 min-h-screen">
      {/* BackgroundBeams with a lower z-index */}
      <div className="absolute inset-0 -z-10">
        <BackgroundBeams />
      </div>

      {/* SignupFormDemo with a higher z-index */}
      <div className="w-full flex justify-center items-center">
        <SignupFormDemo />
      </div>
    </main>
  );
}
