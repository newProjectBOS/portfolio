import socials from "../../data/socials";
import type { Social } from "../../data/socials";

import pages from "../../data/pages";
import type { Pages } from "../../data/pages";

const hoverColorMap: Record<string, string> = {
    instagram: "hover:text-pink-600",
    facebook: "hover:text-blue-600",
    linkedin: "hover:text-blue-700",
    email: "hover:text-red-500",
    phone: "hover:text-green-600",
};

const ContactComponent = ({ name, url, icon }: Social) => {
    const hoverClass = hoverColorMap[name.toLowerCase()] ?? "";
    return (
        <li>
            <a
                href={url}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-base text-gray-500 hover:border-gray-200 transition-colors ${hoverClass}`}
            >
                <span className="[&_svg]:w-7 [&_svg]:h-7 shrink-0">
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
            className="flex items-center justify-between py-4 border-b border-gray-100 text-base text-gray-700 hover:text-gray-400 transition-colors"
        >
            {page.name}
            <span className="text-gray-300 text-lg">→</span>
        </a>
    )
}


export default () => {


    return (
        <div className="relative bg-white pt-20 pb-32 px-6 overflow-hidden min-h-210" id="contact">
            <div className="absolute inset-0 w-full h-full">
                <svg
                    className="absolute bottom-0 w-full"
                    viewBox="0 0 1440 560"
                    preserveAspectRatio="none"
                    style={{ height: '720px' }}
                >
                    <path 
                        d="M 0,542 C 96,452.2 288,138.6 480,93 C 672,47.4 768,286.4 960,314 C 1152,341.6 1344,247.6 1440,231 L 1440,560 L 0,560 Z" 
                        fill="#f5f5f5"
                        opacity="0.5"
                    />
                    <path 
                        d="M 0,14 C 96,83.6 288,322.4 480,362 C 672,401.6 768,189.6 960,212 C 1152,234.4 1344,421.6 1440,474 L 1440,560 L 0,560 Z" 
                        fill="#e5e5e5"
                        opacity="0.5"
                    />
                    <path 
                        d="M 0,171 C 144,233.8 432,490.2 720,485 C 1008,479.8 1296,213 1440,145 L 1440,560 L 0,560 Z" 
                        fill="#d4d4d4"
                        opacity="0.5"
                    />
                </svg>
            </div>
            
            <div className="relative z-10 w-full max-w-6xl mx-auto">
                <hr className="border-0 h-px bg-gray-100 mb-16" />
                <div className="flex gap-16">
                    <div className="flex-[1.6]">
                        <h2 className="text-3xl font-medium text-gray-900 mb-4 leading-snug">
                            Skontaktuj się z nami
                        </h2>
                        <p className="text-base text-gray-400 leading-relaxed mb-10">
                            Jesteśmy do dyspozycji — napisz, zadzwoń lub obserwuj nas na Instagramie.
                        </p>
                        <ul className="flex flex-col gap-2.5">
                            {Object.values(socials).map((social) => {
                                return (
                                    <ContactComponent key={social.url} {...social} />
                                )
                            })}
                        </ul>
                    </div>
                    <div className="flex-1 pt-2">
                        <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-5">nawigacja</p>
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