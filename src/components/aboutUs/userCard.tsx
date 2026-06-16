import { FiLinkedin, FiTwitter, FiGithub, FiMail, FiInstagram } from "react-icons/fi";
import type { TeamMember } from "./teamMember";

const UserCard = ({ name, role, img, socials }: TeamMember) => {
    return (
        <div className="group h-64 perspective-[1000px] scroll-smooth" id = "aboutUs">
            <div className="relative h-full w-full transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">

                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm backface-hidden">
                    <img src={img} alt={name} className="mb-4 h-20 w-20 rounded-full object-cover" />
                    <h2 className="mb-1 text-base font-medium">{name}</h2>
                    <p className="text-sm text-gray-500">{role}</p>
                    <p className="mt-3 text-xs text-gray-400">najedź, aby zobaczyć więcej</p>
                </div>

                <div className="absolute inset-0 flex flex-col rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm backface-hidden transform-[rotateY(180deg)] ml-10">
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

export default UserCard;