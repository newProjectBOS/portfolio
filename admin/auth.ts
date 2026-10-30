const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLICKEY = import.meta.env.VITE_SUPABASE_PUBLICKEY;
const STORAGE_KEY = "admin_session";

export type Session = {
    accessToken: string;
    refreshToken: string;
    expiresAt: number; // unix, sekundy
    email: string;
};

// VITE_SUPABASE_URL wskazuje na tabelę (/rest/v1/projects), auth jest pod /auth/v1 tej samej domeny
const authUrl = (path: string) => {
    if (!SUPABASE_URL || !SUPABASE_PUBLICKEY) {
        throw new Error("Brak VITE_SUPABASE_URL lub VITE_SUPABASE_PUBLICKEY w .env");
    }
    return `${new URL(SUPABASE_URL).origin}/auth/v1${path}`;
};

export const signIn = async (email: string, password: string): Promise<Session> => {
    const response = await fetch(authUrl("/token?grant_type=password"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_PUBLICKEY!,
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.error_code === "invalid_credentials"
                ? "Nieprawidłowy e-mail lub hasło"
                : data.msg ?? data.error_description ?? `Logowanie nie powiodło się (${response.status})`,
        );
    }

    const session: Session = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at,
        email: data.user?.email ?? email,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
};

// zwraca sesję tylko jeśli token jeszcze nie wygasł
export const getSession = (): Session | null => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const session: Session = JSON.parse(raw);
        if (session.expiresAt * 1000 <= Date.now()) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
        return session;
    } catch {
        return null;
    }
};

export const signOut = async () => {
    const session = getSession();
    localStorage.removeItem(STORAGE_KEY);
    if (!session) return;
    // unieważnia refresh token po stronie Supabase; lokalna sesja jest już usunięta niezależnie od wyniku
    await fetch(authUrl("/logout"), {
        method: "POST",
        headers: {
            apikey: SUPABASE_PUBLICKEY!,
            Authorization: `Bearer ${session.accessToken}`,
        },
    }).catch(() => {});
};
