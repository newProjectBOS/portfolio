import { FiLinkedin, FiTwitter, FiGithub, FiMail, FiInstagram } from "react-icons/fi";
import type { TeamMember } from "./teamMember";

const UserCard = ({ name, role, img, socials, description }: TeamMember) => {
    return (
        <div className="group h-96 w-64 perspective-[1000px]">
            <div className="relative h-full w-full transition-transform duration-700 transform-3d group-hover:transform-[rotateY(180deg)]">

                {/* Przód */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-md p-6 backface-hidden">
                    <img
                        src={img}
                        alt={name}
                        className="h-24 w-24 rounded-full object-cover shadow-md mb-4"
                    />
                    <h2 className="text-base font-semibold text-gray-800">{name}</h2>
                    <span className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-600">
                        {role}
                    </span>
                    <p className="mt-8 text-xs text-gray-300">najedź, aby zobaczyć więcej</p>
                </div>

                {/* Tył */}
                <div className="absolute inset-0 flex flex-col rounded-2xl bg-white border border-gray-100 shadow-md p-5 backface-hidden transform-[rotateY(180deg)]">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={img} alt="" className="h-12 w-12 rounded-full object-cover" />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{name}</p>
                            <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                                {role}
                            </span>
                        </div>
                    </div>

                    <hr className="mb-3 border-gray-100" />

                    {description && (
                        <p className="text-xs text-gray-500 leading-relaxed flex-1">{description}</p>
                    )}

                    {socials && (
                        <div className="mt-auto pt-3">
                            <hr className="mb-3 border-gray-100" />
                            <p className="text-xs text-gray-400 mb-3 text-center">Media społecznościowe i kontakt</p>
                            <div className="flex gap-3 justify-center text-base">
                                {socials.linkedin && (
                                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                                        <FiLinkedin />
                                    </a>
                                )}
                                {socials.twitter && (
                                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-sky-50 text-sky-400 hover:bg-sky-100 hover:text-sky-600 transition-colors">
                                        <FiTwitter />
                                    </a>
                                )}
                                {socials.github && (
                                    <a href={socials.github} target="_blank" rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                                        <FiGithub />
                                    </a>
                                )}
                                {socials.email && (
                                    <a href={`mailto:${socials.email}`}
                                        className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                                        <FiMail />
                                    </a>
                                )}
                                {socials.instagram && (
                                    <a href={socials.instagram} target="_blank" rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-700 transition-colors">
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