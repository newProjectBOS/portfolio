import { FiInstagram, FiFacebook, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

type Social = {
    name: string;
    url: string;
    icon: React.ReactNode;
}

const socials: Record<string, Social> = {
    "instagram": {
        name: "Instagram",
        url: "https://instagram.com",
        icon: <FiInstagram />
    },
    "facebook": {
        name: "Facebook",
        url: "https://facebook.com",
        icon: <FiFacebook />
    },
    "linkedin": {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: <FiLinkedin />
    },
    "email": {
        name: "email",
        url: "test@example.com",
        icon: <FiMail />
    },
    "phone": {
        name: "phone",
        url: "111222333",
        icon: <FiPhone />
    }
};

export default socials;
export type { Social };