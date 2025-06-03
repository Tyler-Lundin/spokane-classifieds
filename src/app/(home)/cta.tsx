import Link from "next/link";

export default function HomeCTA() {
    return (
        <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">
                        Start Buying and Selling in Spokane Today
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Join thousands of local buyers and sellers. Post your first listing in minutes.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link 
                        href="/post"
                        className="inline-block px-8 py-4 text-lg font-semibold"
                    >
                        Post Your First Listing
                    </Link>
                    <p className="text-sm">
                        Already have an account? <Link href="/login" className="underline">Sign in</Link>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Local Community</h3>
                        <p>Connect with buyers and sellers in your area</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Quick & Easy</h3>
                        <p>Post listings in minutes, not hours</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Safe & Secure</h3>
                        <p>Verified users and secure transactions</p>
                    </div>
                </div>
            </div>
        </section>
    );
}