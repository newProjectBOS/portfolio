import type { ProjectRow } from "./props";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLICKEY = import.meta.env.VITE_SUPABASE_PUBLICKEY;

const fetchProjects = async (): Promise<ProjectRow[]> => {
    if (!SUPABASE_URL || !SUPABASE_PUBLICKEY) {
        throw new Error("Brak VITE_SUPABASE_URL lub VITE_SUPABASE_PUBLICKEY w .env");
    }

    const response = await fetch(`${SUPABASE_URL}?select=*`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_PUBLICKEY,
        },
    });

    if (!response.ok) {
        throw new Error(`Nie udało się pobrać projektów (${response.status})`);
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
};

export default fetchProjects;
