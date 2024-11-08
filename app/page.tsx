import { SignupFormDemo } from "@/components/auth/SignupForm";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Cover } from "@/components/ui/cover";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center overflow-hidden mx-auto sm:px-10 px-5 min-h-screen">
      {/* BackgroundBeams with a lower z-index */}
      <div className="absolute inset-0 -z-10">
        <BackgroundBeams />
      </div>

      {/* Main content with two columns */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center max-w-6xl">
        {/* Left Section for Text */}
        <div className="w-full sm:w-1/2 text-white sm:pr-10 mb-10 sm:mb-0">
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Build amazing websites <br /> at <Cover>warp speed</Cover>
          </h1>
          <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-lg">
            Experience seamless onboarding, manage customer relationships, and
            simplify your workflow with our all-in-one platform.
          </p>
        </div>

        {/* Right Section for SignupFormDemo */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <SignupFormDemo />
        </div>
      </div>
    </main>
  );
}
