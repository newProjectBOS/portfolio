import socials from "../../data/socials";
import type { Social } from "../../data/socials";

import pages from "../../data/pages";
import type { Pages } from "../../data/pages";

const hoverColorMap: Record<string, string> = {
    instagram: "hover:text-pink-400",
    facebook: "hover:text-blue-400",
    linkedin: "hover:text-blue-400",
    email: "hover:text-red-400",
    phone: "hover:text-green-400",
};

const ContactComponent = ({ name, url, icon }: Social) => {
    const hoverClass = hoverColorMap[name.toLowerCase()] ?? "";
    return (
        <li>
            <a
                href={url}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-base text-zinc-200 hover:border-white/20 transition-colors ${hoverClass}`}
            >
                <span className="[&_svg]:w-6 [&_svg]:h-6 shrink-0">
                    {icon}
                </span>
                {name}
            </a>
        </li>
    );
};

const NavComponent = (page: Pages) => {
    return (
        <a
            key={page.id}
            href={`#${page.id}`}
            className="flex items-center justify-between py-3 border-b border-white/10 text-base text-zinc-200 hover:text-zinc-500 transition-colors"
        >
            {page.name}
            <span className="text-zinc-600 text-lg">→</span>
        </a>
    )
}

// Biała fala na górze — ta sama krzywa odbita w pionie (translate + scale),
// dzięki czemu wypełnienie jest u góry i płynnie łączy białą sekcję powyżej
// z czarnym tłem kontaktu.
const WAVE_PATH =
    "M0,128L60,149.3C120,171,240,213,360,202.7C480,192,600,128,720,117.3C840,107,960,149,1080,160C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z";

export default () => {


    return (
        <div className="relative bg-black pt-[11rem] md:pt-[14rem] pb-24 px-6 overflow-hidden min-h-[42rem]" id="contact">
            <div className="absolute top-0 left-0 w-full pointer-events-none" aria-hidden="true">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    className="block w-full h-[8rem] md:h-[11rem]"
                >
                    <path d={WAVE_PATH} fill="#ffffff" transform="translate(0,320) scale(1,-1)" />
                </svg>
            </div>

            <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <svg
                    className="absolute bottom-0 w-full"
                    viewBox="0 0 1440 560"
                    preserveAspectRatio="none"
                    style={{ height: '600px' }}
                >
                    <path 
                        d="M 0,542 C 96,452.2 288,138.6 480,93 C 672,47.4 768,286.4 960,314 C 1152,341.6 1344,247.6 1440,231 L 1440,560 L 0,560 Z" 
                        fill="#ffffff"
                        opacity="0.07"
                    />
                    <path 
                        d="M 0,14 C 96,83.6 288,322.4 480,362 C 672,401.6 768,189.6 960,212 C 1152,234.4 1344,421.6 1440,474 L 1440,560 L 0,560 Z" 
                        fill="#ffffff"
                        opacity="0.12"
                    />
                    <path 
                        d="M 0,171 C 144,233.8 432,490.2 720,485 C 1008,479.8 1296,213 1440,145 L 1440,560 L 0,560 Z" 
                        fill="#ffffff"
                        opacity="0.18"
                    />
                </svg>
            </div>
            
            <div className="relative z-10 w-full max-w-6xl mx-auto">
                <hr className="border-0 h-px bg-white/10 mb-12" />
                <div className="flex gap-12">
                    <div className="flex-[1.6] text-center md:text-left">
                        <h2 className="text-2xl font-medium text-white mb-3 leading-snug">
                            Skontaktuj się z nami
                        </h2>
                        <p className="text-base text-zinc-300 leading-relaxed mb-8">
                            Jesteśmy do dyspozycji — napisz, zadzwoń lub obserwuj nas na Instagramie.
                        </p>
                        <ul className="flex flex-col gap-1.5 w-fit mx-auto md:mx-0">
                            {Object.values(socials).map((social) => {
                                return (
                                    <ContactComponent key={social.url} {...social} />
                                )
                            })}
                        </ul>
                    </div>
                    <div className="hidden md:block flex-1 pt-2">
                        <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase mb-4">nawigacja</p>
                        <nav>
                            {Object.values(pages).map((page) => {
                                return (
                                    <NavComponent key={page.id} {...page} />
                                )
                            })}
                        </nav>
                    </div>

                </div>
            </div>
        </div>
    );
};
