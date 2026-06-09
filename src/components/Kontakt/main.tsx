import socials from "../../data/socials";
import type { Social } from "../../data/socials";

import pages from "../../data/pages";
import type { Pages } from "../../data/pages";

const ContactComponent = (social: Social) => {
    return (
        <li key={social.url}>
            <a href={social.url} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-gray-100 text-xs text-gray-700 hover:border-gray-200 transition-colors">
                {social.icon}
                {social.name}
            </a>
        </li>
    )
}

const NavComponent = (page: Pages) => {
    return (
        <a
            key={page.id}
            href={`#${page.id}`}
            className="flex items-center justify-between py-3 border-b border-gray-100 text-xs text-gray-700 hover:text-gray-400 transition-colors"
        >
            {page.name}
            <span className="text-gray-200 text-xs">→</span>
        </a>
    )
}


export default () => {

    console.log(socials);

    return (
        <div className="bg-white py-12 px-4" id="contact">
            <div className="w-full max-w-4xl mx-auto">
                <hr className="border-0 h-px bg-gray-100 mb-12" />
                <div className="flex gap-12">
                    <div className="flex-[1.6]">
                        <p className="text-xs font-medium tracking-widest text-gray-300 uppercase mb-3">kontakt</p>
                        <h2 className="text-lg font-medium text-gray-900 mb-2 leading-snug">
                            Skontaktuj się z nami
                        </h2>
                        <p className="text-xs text-gray-400 leading-relaxed mb-6">
                            Jesteśmy do dyspozycji — napisz, zadzwoń lub obserwuj nas na Instagramie.
                        </p>
                        <ul className="flex flex-col gap-1.5">
                            {Object.values(socials).map((social) => {
                                return (
                                    <ContactComponent key={social.url} {...social} />
                                )
                            })}
                        </ul>
                    </div>
                    <div className="flex-1 pt-0.5">
                        <p className="text-xs font-medium tracking-widest text-gray-300 uppercase mb-3">nawigacja</p>
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