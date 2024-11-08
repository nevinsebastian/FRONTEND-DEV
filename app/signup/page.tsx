// app/signup/page.tsx
import { SignupFormDemo } from "@/components/auth/SignupForm";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Cover } from "@/components/ui/cover";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Experience efficiency like never before. Accelerate customer
            onboarding, streamline employee verification, and manage your entire
            workflow seamlessly. With roles-based dashboards and robust CRM
            integrations, our all-in-one solution empowers your team to work
            smarter, not harder`;

export default function SignupPage() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center overflow-hidden mx-auto sm:px-10 px-5 min-h-screen">
      {/* BackgroundBeams with a lower z-index */}
      <div className="absolute inset-0 -z-10">
        <BackgroundBeams />
      </div>

      {/* Main content with two columns */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center max-w-7xl">
        {/* Left Section for Text */}
        <div className="w-full sm:w-3/5 text-white sm:pr-10 mb-20 sm:mb-0 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold max-w-full text-center sm:text-left mt-6 relative z-20 py-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Transform Your Onboarding Process at <Cover>warp speed</Cover>
          </h1>

          <div className="text-lg md:text-xl leading-relaxed text-center sm:text-left max-w-3xl mx-auto sm:mx-0">
            <TextGenerateEffect words={words} />
          </div>
        </div>

        {/* Right Section for SignupFormDemo */}
        <div className="w-full sm:w-2/5 flex justify-center">
          <SignupFormDemo />
        </div>
      </div>
    </main>
  );
}
