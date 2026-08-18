import ServiceCard from "./serviceCard";

import "../../style.css";

const services = [
  {
    id: 1,
    number: "01",
    title: "Tworzenie stron",
    text: "Stworzymy dla Ciebie nowoczesną stronę internetową od podstaw — dopasowaną do Twojej firmy, marki i potrzeb. Zadbamy o estetyczny wygląd, intuicyjną obsługę i pełną funkcjonalność. Twoja strona będzie profesjonalną wizytówką firmy i narzędziem do pozyskiwania klientów.",
  },
  {
    id: 2,
    number: "02",
    title: "Modernizacja stron",
    text: "Unowocześniamy, odświeżamy i optymalizujemy istniejące strony, nadając im nowoczesny wygląd i lepszą funkcjonalność. Poprawiamy ich szybkość, przejrzystość oraz działanie na urządzeniach mobilnych. Sprawiamy, że Twoja strona ponownie zaczynie przyciągać klientów.",
  },
  {
    id: 3,
    number: "03",
    title: "Automatyzacja stron",
    text: "Automatyzujemy i optymalizujemy procesy w Twojej firmie, aby działała szybciej, sprawniej i bardziej efektywnie dzięki Twojej stronie. Łączymy stronę z rozwiązaniami, które ograniczają ręczną pracę i usprawniają obsługę klientów. Ty oszczędzasz czas, a Twój biznes działa sprawniej.",
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
      <hr className="border-zinc-800 mb-8 sm:mb-12 w-full lg:max-w-7xl xl:max-w-[88rem] mx-auto" />
      <div className="w-full flex items-center justify-center" id="offert">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 lg:gap-14 w-full min-w-0 lg:max-w-7xl xl:max-w-[88rem] mx-auto items-stretch">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};
