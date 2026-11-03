import { FiInstagram, FiFacebook, FiMail, FiPhone } from "react-icons/fi";

type Social = {
    name: string;
    url: string;
    icon: React.ReactNode;
}

const socials: Record<string, Social> = {
    "instagram": {
        name: "Instagram",
        url: "https://www.instagram.com/grelsites/",
        icon: <FiInstagram />
    },
    "facebook": {
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61590577830014",
        icon: <FiFacebook />
    },
    "email": {
        name: "Email",
        url: "grelsites@gmail.com",
        icon: <FiMail />
    },
    "phone": {
        name: "Telefon",
        url: "tel:573310667",
        icon: <FiPhone />
    }
};

export default socials;
export type { Social };