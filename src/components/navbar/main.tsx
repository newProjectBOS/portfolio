import { FiFacebook, FiInstagram, FiLinkedin, FiMenu, FiMail } from "react-icons/fi";

export default () => {
    return (
        <nav className="fixed top-0 left-0 right-0 w-full z-50 h-36 bg-gradient-to-b from-black/90 via-black/60 to-transparent text-white">
            <div className="mx-auto relative flex max-w-7xl items-center justify-center px-4 py-4">
                <button className="absolute left-4 text-2xl text-white focus:outline-none flex h-10 w-10 items-center justify-center rounded-full text-gray-50 text-xl transition duration-300 transform hover:scale-110 hover:bg-gray-300/20 hover:text-white">
                    <FiMenu />
                </button>
                <div className="text-2xl font-bold">GrelSites</div>
                <div className="absolute right-4 flex items-center gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full text-gray-50 text-xl transition duration-300 transform hover:scale-110 hover:bg-gray-300/20 hover:text-white">
                        <FiInstagram />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full text-gray-50 text-xl transition duration-300 transform hover:scale-110 hover:bg-gray-300/20 hover:text-white">
                        <FiFacebook />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full text-gray-50 text-xl transition duration-300 transform hover:scale-110 hover:bg-gray-300/20 hover:text-white">
                        <FiLinkedin />
                    </a>
                    <a href="mailto:test@example.com" className="flex h-10 w-10 items-center justify-center rounded-full text-gray-50 text-xl transition duration-300 transform hover:scale-110 hover:bg-gray-300/20 hover:text-white">
                        <FiMail />
                    </a>
                </div>
            </div>
        </nav>
    )
}