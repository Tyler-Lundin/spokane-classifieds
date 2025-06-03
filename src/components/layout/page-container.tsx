export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen min-h-screen overflow-x-hidden ">
                {children}
        </div>
    )
}