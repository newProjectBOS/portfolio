type TeamMember = {
    name: string;
    role: string;
    img: string;
    description: string;
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
        description: "Jan is a skilled software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
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
        description: "Jan is a skilled software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
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
        description: "Jan is a skilled software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
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