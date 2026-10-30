import { useState } from "react";
import type { SubmitEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import { getSession, signIn } from "../auth";

export default () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    if (getSession()) return <Navigate to="/admin/panel" replace />;

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        setError(null);
        setLoading(true);
        try {
            await signIn(String(form.get("email")), String(form.get("password")));
            navigate("/admin/panel", { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Logowanie nie powiodło się");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-5">
            <div className="w-full max-w-sm">
                <img src="/logo.png" alt="Logo" className="mx-auto w-24 h-24 mb-6" />
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/70">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            required
                            className="mt-1 block w-full rounded-md bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white/40"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white/70">
                            Hasło
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            required
                            className="mt-1 block w-full rounded-md bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-white/40"
                        />
                    </div>
                    {error && (
                        <p role="alert" className="text-sm text-red-400">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2.5 px-4 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                    >
                        {loading ? "Logowanie..." : "Zaloguj"}
                    </button>
                </form>
            </div>
        </div>
    );
};
