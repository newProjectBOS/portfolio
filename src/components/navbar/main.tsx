import { FiFacebook, FiInstagram } from "react-icons/fi";
// bg-linear-to-bl from-black via-black/70
export default () => {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-transparent text-white to-transparent">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                <h1 className="text-2xl font-bold">BOS</h1>
                <div className="flex items-center gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-2 text-xl transition hover:bg-white/20">
                        <FiInstagram />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-2 text-xl transition hover:bg-white/20">
                        <FiFacebook />
                    </a>
                </div>
            </div>
        </nav>
    )
}