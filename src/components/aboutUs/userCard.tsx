import { useId, useState } from "react";
import type { FocusEvent } from "react";
import {
    FiLinkedin,
    FiTwitter,
    FiGithub,
    FiMail,
    FiInstagram,
    FiChevronDown,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { TeamMember, TeamSocials } from "./teamMember";

type SocialChannel = {
    key: keyof TeamSocials;
    Icon: IconType;
    label: string;
    href: (value: string) => string;
    external: boolean;
    tone: string;
    ring: string;
};

const SOCIAL_CHANNELS: SocialChannel[] = [
    {
        key: "linkedin",
        Icon: FiLinkedin,
        label: "LinkedIn",
        href: (value) => value,
        external: true,
        tone: "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800",
        ring: "focus-visible:ring-blue-500",
    },
    {
        key: "twitter",
        Icon: FiTwitter,
        label: "Twitter",
        href: (value) => value,
        external: true,
        tone: "bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-800",
        ring: "focus-visible:ring-sky-500",
    },
    {
        key: "github",
        Icon: FiGithub,
        label: "GitHub",
        href: (value) => value,
        external: true,
        tone: "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900",
        ring: "focus-visible:ring-gray-500",
    },
    {
        key: "email",
        Icon: FiMail,
        label: "E-mail",
        href: (value) => `mailto:${value}`,
        external: false,
        tone: "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900",
        ring: "focus-visible:ring-gray-500",
    },
    {
        key: "instagram",
        Icon: FiInstagram,
        label: "Instagram",
        href: (value) => value,
        external: true,
        tone: "bg-pink-50 text-pink-600 hover:bg-pink-100 hover:text-pink-800",
        ring: "focus-visible:ring-pink-500",
    },
];

const SOCIAL_SIZES = {
    sm: { box: "h-9 w-9", icon: 15, gap: "gap-1.5" },
    base: { box: "h-10 w-10", icon: 17, gap: "gap-2" },
} as const;

const Socials = ({
    socials,
    name,
    size = "base",
}: {
    socials: TeamSocials | undefined;
    name: string;
    size?: keyof typeof SOCIAL_SIZES;
}) => {
    if (!socials) return null;

    const active = SOCIAL_CHANNELS.filter((channel) => socials[channel.key]);
    if (active.length === 0) return null;

    const { box, icon, gap } = SOCIAL_SIZES[size];

    return (
        <ul className={`flex flex-wrap justify-center ${gap}`}>
            {active.map(({ key, Icon, label, href, external, tone, ring }) => (
                <li key={key}>
                    <a
                        href={href(socials[key] as string)}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        aria-label={`${label} — ${name}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex ${box} items-center justify-center rounded-full ${tone} ${ring} transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none active:scale-95`}
                    >
                        <Icon size={icon} aria-hidden="true" focusable="false" />
                    </a>
                </li>
            ))}
        </ul>
    );
};

const Avatar = ({
    src,
    alt,
    className,
    size,
}: {
    src: string;
    alt: string;
    className: string;
    size: number;
}) => (
    <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={`rounded-full bg-gray-100 object-cover ring-1 ring-gray-200 ${className}`}
    />
);

const RoleBadge = ({ role, className = "" }: { role: string; className?: string }) => (
    <span
        className={`inline-block rounded-full bg-black px-3 py-0.5 text-xs font-medium text-white ${className}`}
    >
        {role}
    </span>
);

const UserCard = ({ name, role, img, socials, description }: TeamMember) => {
    const [open, setOpen] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const panelId = useId();
    const releaseFlip = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFlipped(false);
    };

    return (
        <>
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors md:hidden">
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpen((o) => !o)}
                    className="flex w-full items-center gap-4 p-4 text-left transition-transform focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset focus-visible:outline-none active:scale-[0.99]"
                >
                    <Avatar src={img} alt={name} size={64} className="h-16 w-16 shrink-0" />

                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-gray-900">
                            {name}
                        </span>
                        <RoleBadge role={role} className="mt-1" />
                    </span>

                    <FiChevronDown
                        aria-hidden="true"
                        focusable="false"
                        size={18}
                        className={`shrink-0 text-gray-500 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                    />
                </button>

                <div
                    id={panelId}
                    className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                    <div className="overflow-hidden">
                        <div className="px-4 pb-4">
                            <hr className="mb-3 border-gray-200" />
                            {description && (
                                <p className="mb-4 text-xs leading-relaxed text-gray-600">
                                    {description}
                                </p>
                            )}
                            <Socials socials={socials} name={name} />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="mx-auto hidden h-96 w-64 perspective-[1000px] md:block"
                onMouseEnter={() => setFlipped(true)}
                onMouseLeave={() => setFlipped(false)}
                onFocus={() => setFlipped(true)}
                onBlur={releaseFlip}
            >
                <div
                    className={`relative h-full w-full transform-3d transition-transform duration-500 ease-out motion-reduce:transition-none ${flipped ? "rotate-y-180 motion-reduce:rotate-y-0" : ""}`}
                >
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 backface-hidden motion-reduce:backface-visible motion-reduce:transition-opacity motion-reduce:duration-200 ${flipped ? "motion-reduce:opacity-0" : "motion-reduce:opacity-100"}`}
                    >
                        <Avatar src={img} alt={name} size={96} className="mb-4 h-24 w-24" />
                        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
                        <RoleBadge role={role} className="mt-1" />

                    </div>
                    <div
                        className={`absolute inset-0 flex flex-col rounded-2xl border border-gray-200 bg-white p-5 rotate-y-180 backface-hidden motion-reduce:rotate-y-0 motion-reduce:backface-visible motion-reduce:transition-opacity motion-reduce:duration-200 ${flipped ? "motion-reduce:opacity-100" : "motion-reduce:pointer-events-none motion-reduce:opacity-0"}`}
                    >
                        <div aria-hidden="true" className="mb-4 flex items-center gap-3">
                            <Avatar src={img} alt="" size={48} className="h-12 w-12" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-gray-900">{name}</p>
                                <RoleBadge role={role} className="px-2" />
                            </div>
                        </div>

                        <hr className="mb-3 border-gray-200" />

                        {description && (
                            <p className="min-h-0 flex-1 overflow-y-auto pr-1 text-xs leading-relaxed text-gray-600 [scrollbar-color:var(--color-gray-300)_transparent] [scrollbar-width:thin]">
                                {description}
                            </p>
                        )}

                        {socials && (
                            <div className="mt-auto pt-3">
                                <hr className="mb-3 border-gray-200" />
                                <p className="mb-3 text-center text-[10px] tracking-[0.16em] text-gray-500 uppercase">
                                    kontakt
                                </p>
                                <Socials socials={socials} name={name} size="sm" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
