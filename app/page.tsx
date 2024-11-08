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
        <div className="w-full sm:w-1/2 text-white sm:pr-10 mb-10 sm:mb-0 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Transform Your Onboarding Process at <Cover>warp speed</Cover>
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold mt-4 mb-6 text-center sm:text-left">
            Welcome to Our Platform
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-center sm:text-left max-w-2xl mx-auto sm:mx-0">
            Experience efficiency like never before. Accelerate customer
            onboarding, streamline employee verification, and manage your entire
            workflow seamlessly. With roles-based dashboards and robust CRM
            integrations, our all-in-one solution empowers your team to work
            smarter, not harder
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
