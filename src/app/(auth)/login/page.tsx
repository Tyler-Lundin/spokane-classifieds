import { garamond, oldStandard } from "@/app/fonts";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] dark:bg-black py-12 px-4 text-black dark:text-white">
      <div className="max-w-md mx-auto">
        <div className="relative border-2 border-black bg-white p-8 shadow-lg dark:bg-black dark:border-white">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className={`${oldStandard.className} text-3xl font-bold text-center mb-8 uppercase tracking-wider`}>
              Sign In
            </h1>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className={`${garamond.className} block text-sm font-medium mb-2`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={`${garamond.className} dark:bg-black dark:border-white  w-full px-4 py-2 border-2 border-black bg-[#fefcf9] focus:outline-none focus:ring-2 focus:ring-black`}
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
                  className={`${garamond.className} dark:bg-black dark:border-white w-full px-4 py-2 border-2 border-black bg-[#fefcf9] focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className={`${garamond.className} w-full dark:bg-black dark:border-white py-3 px-4 border-2 border-black bg-[#fefcf9] hover:bg-black hover:text-white transition-colors duration-200 font-medium`}
              >
                Sign In
              </button>
            </form>

            <div className={`${garamond.className} mt-6 text-center text-sm`}>
              <p>
                Don't have an account?{" "}
                <Link href="/register" className="underline hover:text-gray-600">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 