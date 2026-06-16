type TeamMember = {
    name: string;
    role: string;
    img: string;
    experience?: string;
    skills?: string;
    location?: string;
    socials?: any;
};

const team: TeamMember[] = [
    {
        name: "Jan Kowalski",
        role: "cwaniak",
        img: "https://randomuser.me/api/portraits/men/1.jpg",
        socials: {
            linkedin: "https://linkedin.com/in/jankowalski",
            twitter: "https://twitter.com/jankowalski",
            github: "https://github.com/jankowalski",
            email: "jankowalski@example.com",
            instagram: "https://instagram.com/jankowalski"
        }
    },
    {
        name: "Jan Kowalski",
        role: "cwaniak",
        img: "https://randomuser.me/api/portraits/men/1.jpg",
        socials: {
            linkedin: "https://linkedin.com/in/jankowalski",
            twitter: "https://twitter.com/jankowalski",
            github: "https://github.com/jankowalski",
            email: "jankowalski@example.com",
            instagram: "https://instagram.com/jankowalski"
        }
    },
    {
        name: "Jan Kowalski",
        role: "cwaniak",
        img: "https://randomuser.me/api/portraits/men/1.jpg",
        socials: {
            linkedin: "https://linkedin.com/in/jankowalski",
            twitter: "https://twitter.com/jankowalski",
            github: "https://github.com/jankowalski",
            email: "jankowalski@example.com",
            instagram: "https://instagram.com/jankowalski"
        }
    },
]

export default team
export type {TeamMember}