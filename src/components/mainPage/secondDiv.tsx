import ServiceCard from "./serviceCard";

import "../../style.css";

const services = [
  {
    id: 1,
    number: "01",
    title: "Tworzenie stron",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet tortor in faucibus consequat. Vivamus ac mollis neque. Sed pretium odio et risus lobortis, at viverra est fringilla.",
  },
  {
    id: 2,
    number: "02",
    title: "Modernizacja stron",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet tortor in faucibus consequat. Vivamus ac mollis neque. Sed pretium odio et risus lobortis, at viverra est fringilla.",
  },
  {
    id: 3,
    number: "03",
    title: "Automatyzacja stron",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet tortor in faucibus consequat. Vivamus ac mollis neque. Sed pretium odio et risus lobortis, at viverra est fringilla.",
  },
];

export default () => {
  return (
    <div className="w-full min-w-0 px-5 sm:px-8 md:px-12 lg:px-24">
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-pliant font-normal tracking-tight text-center text-white text-balance">
        Czym sie zajmujemy?
      </h1>
      <p className="text-center text-sm sm:text-base text-zinc-400 mt-3 sm:mt-4 mb-8 sm:mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        laoreet tortor in faucibus consequat. Vivamus ac mollis neque. Sed
        pretium odio et risus lobortis, at viverra est fringilla.
      </p>
      <hr className="border-zinc-800 mb-8 sm:mb-12" />
      <div className="w-full flex items-center justify-center" id="offert">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 lg:gap-16 w-full min-w-0 items-stretch">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};
