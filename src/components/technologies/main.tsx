import ScrableText from "../../effects/scrableText";
import TypewriterText from "../../effects/TypewriterText";
import ImageComponent from "./imageComponent";

export default () => {
    return (
        <div id="technologies" className="bg-white py-20">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <ScrableText text="Technologie, które napędzają nasze projekty" className="text-4xl font-bold mb-4 text-black" />
                <hr className="my-6 border-gray-200" />
                <TypewriterText
                    text="Od front-endu po back-end, korzystamy z najnowszych technologii, aby dostarczać innowacyjne rozwiązania."
                    speed={35}
                    deleteSpeed={30}
                    className="mt-8 text-gray-600 text-lg"
                />

                <div className="mt-30">
                    <h3 className="text-2xl font-semibold text-black mb-6">Frontend</h3>
                    <p className="text-md text-gray-700 mb-4 mx-auto w-3/4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id efficitur turpis. Vivamus leo ipsum, luctus eu pharetra et, congue id ex. Praesent sit amet ex sed velit tempus maximus. Maecenas egestas justo sed ante convallis cursus. Sed luctus elit eu mollis porttitor.</p>
                    <hr className="my-6 w-1/3 mx-auto border-gray-200" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" href="https://react.dev" />
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" href="https://tailwindcss.com" />
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" href="https://www.typescriptlang.org" />
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" />
                    </div>
                </div>

                <div className="mt-30">
                    <h3 className="text-2xl font-semibold text-black mb-6">Backend</h3>
                    <p className="text-md text-gray-700 mb-4 mx-auto w-3/4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id efficitur turpis. Vivamus leo ipsum, luctus eu pharetra et, congue id ex. Praesent sit amet ex sed velit tempus maximus. Maecenas egestas justo sed ante convallis cursus. Sed luctus elit eu mollis porttitor.</p>
                    <hr className="my-6 w-1/3 mx-auto border-gray-200" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" href="https://nodejs.org" />
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" alt="Express" href="https://expressjs.com" />
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" href="https://www.mongodb.com" />
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" alt="Redis" href="https://redis.io" />
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" href="https://www.mysql.com" />
                    </div>
                </div>

                <div className="mt-30">
                    <h3 className="text-2xl font-semibold text-black mb-6">CMS</h3>
                    <p className="text-md text-gray-700 mb-4 mx-auto w-3/4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id efficitur turpis. Vivamus leo ipsum, luctus eu pharetra et, congue id ex. Praesent sit amet ex sed velit tempus maximus. Maecenas egestas justo sed ante convallis cursus. Sed luctus elit eu mollis porttitor.</p>
                    <hr className="my-6 w-1/3 mx-auto border-gray-200" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <ImageComponent src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg" alt="WordPress" href="https://wordpress.org" />
                    </div>
                </div>

            </div>
        </div>
    )
}