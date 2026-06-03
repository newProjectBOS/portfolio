import { FiPhone, FiMail, FiInstagram } from "react-icons/fi";

export default () => {
    return (
        <div id="contact">
            <div className="bg-black pb-30 flex flex-col items-center justify-center px-4 py-16">
                <hr className="border-0 h-px bg-gray-200 w-128 mx-auto mt-16 mb-32 mb-0" />
                <div className="w-full max-w-4xl">
                    <div className="flex gap-12">
                        <div className="flex-[1.6]">
                            <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-2">kontakt</p>
                            <h1 className="text-2xl font-medium text-gray-900 mb-4 leading-snug">
                                Skontaktuj się z nami
                            </h1>
                            <p className="text-sm text-gray-500 leading-relaxed mb-7">
                                Jesteśmy do dyspozycji — napisz, zadzwoń lub obserwuj nas na Instagramie.
                                Odpowiadamy szybko i chętnie pomagamy.
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                {[
                                    { href: "mailto:test@example.com", Icon: FiMail, label: "test@example.com" },
                                    { href: "tel:+48123456789", Icon: FiPhone, label: "+48 123 456 789" },
                                    { href: "https://instagram.com", Icon: FiInstagram, label: "@naszinstagram" },
                                ].map(({ href, Icon, label }) => (
                                    <li key={href}>
                                        <a
                                            href={href}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-100 text-sm text-gray-800 hover:border-gray-300 transition-colors"
                                        >
                                            <Icon className="text-gray-400 shrink-0" size={16} />
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 pt-0.5">
                            <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-2">nawigacja</p>
                            <nav>
                                {["O nas", "Projekty"].map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="flex items-center justify-between py-3.5 border-b border-gray-100 text-sm text-gray-800 hover:text-gray-600 transition-colors"
                                    >
                                        {item}
                                        <span className="text-gray-300">→</span>
                                    </a>
                                ))}
                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};