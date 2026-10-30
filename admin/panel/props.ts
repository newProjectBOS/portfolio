export type ProjectRow = {
    id: number;
    created_at: string;
    companyName: string | null;
    url: string | null;
    cardText: string | null;
    longText: string | null;
    technologies: string[] | null;
    screenshot: string | null;
    tasks: string[] | null;
}
