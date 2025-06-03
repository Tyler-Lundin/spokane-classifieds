import { garamond, oldStandard } from "@/app/fonts";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="relative border-2 border-black bg-white p-8 shadow-lg">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className={`${oldStandard.className} text-3xl font-bold text-center mb-8 uppercase tracking-wider`}>
              Create Account
            </h1>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className={`${garamond.className} block text-sm font-medium mb-2`}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`${garamond.className} w-full px-4 py-2 border-2 border-black bg-[#fefcf9] focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className={`${garamond.className} block text-sm font-medium mb-2`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={`${garamond.className} w-full px-4 py-2 border-2 border-black bg-[#fefcf9] focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className={`${garamond.className} block text-sm font-medium mb-2`}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={`${garamond.className} w-full px-4 py-2 border-2 border-black bg-[#fefcf9] focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className={`${garamond.className} block text-sm font-medium mb-2`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`${garamond.className} w-full px-4 py-2 border-2 border-black bg-[#fefcf9] focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                className={`${garamond.className} w-full py-3 px-4 border-2 border-black bg-[#fefcf9] hover:bg-black hover:text-white transition-colors duration-200 font-medium`}
              >
                Create Account
              </button>
            </form>

            <div className={`${garamond.className} mt-6 text-center text-sm`}>
              <p>
                Already have an account?{" "}
                <Link href="/login" className="underline hover:text-gray-600">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 