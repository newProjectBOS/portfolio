export type TechGroup = "frontend" | "backend" | "cms";

export type Tech = {
  name: string;
  src: string;
  href: string;
  group: TechGroup;
};

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const TECHS: Tech[] = [
  { name: "React", src: `${DEVICON}/react/react-original.svg`, href: "https://react.dev", group: "frontend" },
  { name: "Tailwind CSS", src: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, href: "https://tailwindcss.com", group: "frontend" },
  { name: "TypeScript", src: `${DEVICON}/typescript/typescript-original.svg`, href: "https://www.typescriptlang.org", group: "frontend" },
  { name: "JavaScript", src: `${DEVICON}/javascript/javascript-original.svg`, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", group: "frontend" },
  { name: "Node.js", src: `${DEVICON}/nodejs/nodejs-original.svg`, href: "https://nodejs.org", group: "backend" },
  { name: "Express", src: `${DEVICON}/express/express-original.svg`, href: "https://expressjs.com", group: "backend" },
  { name: "MongoDB", src: `${DEVICON}/mongodb/mongodb-original.svg`, href: "https://www.mongodb.com", group: "backend" },
  { name: "Redis", src: `${DEVICON}/redis/redis-original.svg`, href: "https://redis.io", group: "backend" },
  { name: "MySQL", src: `${DEVICON}/mysql/mysql-original.svg`, href: "https://www.mysql.com", group: "backend" },
  { name: "WordPress", src: `${DEVICON}/wordpress/wordpress-original.svg`, href: "https://wordpress.org", group: "cms" },
  {name: "wooCommerce", src: `${DEVICON}/woocommerce/woocommerce-original.svg`, href: "https://woocommerce.com", group: "cms" },
];

// geometria koła w jednostkach viewBox SVG
export const WHEEL = {
  viewBox: 500,
  radius: 190,
  iconSize: 56,
  // czas jednego obrotu w sekundach
  duration: 40,
};
