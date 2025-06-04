export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen min-h-screen overflow-x-hidden bg-white dark:bg-black text-black dark:text-white">
                {children}
        </div>
    )
}