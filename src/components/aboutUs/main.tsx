import TypewriterText from "../../effects/TypewriterText";
import ScrableText from "../../effects/scrableText";
import team from "./teamMember";
import UserCard from './userCard'

export default () => {
    return (
        <div id="AboutUs" className="bg-gray-50 py-50">
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