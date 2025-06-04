
export default function MobileButton({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    if (isOpen) return (

                <button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 right-4 z-50 bg-white/50 dark:bg-black/50 rounded-lg backdrop-blur-md p-1  text-black dark:text-white hover:blur-[2px] blur-[0px] transition-all md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
    )
    return (
        <button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 right-4 z-50 md:hidden text-black bg-white/50 dark:bg-black/50 rounded-lg backdrop-blur-md p-1 dark:text-white hover:blur-[2px] blur-[0px] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
        </button>
    )
}