import { FiLinkedin, FiTwitter, FiGithub, FiMail, FiInstagram } from "react-icons/fi";
import TypewriterText from "../../effects/TypewriterText";
import ScrableText from "../../effects/scrableText";
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

const UserCard = ({ name, role, img, socials }: TeamMember) => {
    return (
        <div className="group h-64 [perspective:1000px] scroll-smooth" id = "aboutUs">
            <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm [backface-visibility:hidden]">
                    <img src={img} alt={name} className="mb-4 h-20 w-20 rounded-full object-cover" />
                    <h2 className="mb-1 text-base font-medium">{name}</h2>
                    <p className="text-sm text-gray-500">{role}</p>
                    <p className="mt-3 text-xs text-gray-400">najedź, aby zobaczyć więcej</p>
                </div>

                <div className="absolute inset-0 flex flex-col rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] ml-10">
                    <div className="flex items-center gap-3 mb-3">
                        <img src={img} alt="" className="h-11 w-11 rounded-full object-cover" />
                        <div>
                            <p className="text-sm font-medium">{name}</p>
                            <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-600">{role}</span>
                        </div>
                    </div>
                    <hr className="mb-3 border-gray-200" />
                    {socials && (
                        <div>
                            <p className="mt-3 text-xs text-gray-400 mb-2">Media społecznościowe, oraz kontakt</p>
                            <hr className="mb-3 border-gray-200" />
                            <div className="flex gap-3 justify-center">
                                {socials.linkedin && (
                                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                        <FiLinkedin />
                                    </a>
                                )}
                                {socials.twitter && (
                                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                        <FiTwitter />
                                    </a>
                                )}
                                {socials.github && (
                                    <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
                                        <FiGithub />
                                    </a>
                                )}
                                {socials.email && (
                                    <a href={`mailto:${socials.email}`} className="text-gray-700 hover:text-gray-900">
                                        <FiMail />
                                    </a>
                                )}
                                {socials.instagram && (
                                    <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                                        <FiInstagram />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default () => {
    return (
        <div id="AboutUs" className="bg-white py-50">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <ScrableText text="Poznaj nasz zespół" className="text-4xl font-bold mb-4 text-black" />
                <hr className="my-6 border-gray-200" />
                <TypewriterText
                    text="Poznaj nasz wyjątkowy zespół – synergię talentu, kreatywności i zaangażowania, który wspólnie z pasją i innowacyjnością przyczynia się do osiągnięcia sukcesu."
                    speed={35}
                    deleteSpeed={30}
                    className="mt-8 text-gray-600 text-lg"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-center">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 cursor-pointer"
                        >
                            <UserCard
                                name={member.name}
                                role={member.role}
                                img={member.img}
                                socials={member.socials}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}