type Pages = {
    name: string;
    id: string;
}

const pages: Record<string, Pages> = {
    "mainPage": {
        name: "Strona główna",
        id: "mainPage"
    },
    "offert": {
        name: "Oferta",
        id: "offert"
    },
    "projects": {
        name: "Projekty",
        id: "projects"
    },
    "aboutUs": {
        name: "O nas",
        id: "aboutUs"
    },
    "contact": {
        name: "Kontakt",
        id: "contact"
    }

}

export default pages;
export type { Pages };