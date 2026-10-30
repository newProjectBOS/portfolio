import { useNavigate } from "react-router";
import { getSession, signOut } from "../auth";
import ProjectPanel from "./projectPanel";

export default () => {
    const navigate = useNavigate();
    const session = getSession();

    const handleLogout = async () => {
        await signOut();
        navigate("/admin", { replace: true });
    };
    

    return (
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
            <header className="flex items-center justify-between gap-4">
                <img src = "/logo.png" alt="Logo" className="w-12 h-12" />
                <div className="flex items-center gap-4">
                    <span className="text-sm text-white/50">{session?.email}</span>
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
                    >
                        Wyloguj
                    </button>
                </div>
            </header>
            <ProjectPanel />
        </div>
    );
};
