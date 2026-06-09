import PricingCard from "./pricingCard";

const offers = [
    {
        id: 1,
        tag: "STARTER",
        name: "Starter",
        price: "49",
        period: "/ mies.",
        description: "Idealne dla freelancerów i małych projektów.",
        features: [
            "5 projektów",
            "10 GB storage",
            "Email support",
            "Podstawowe analytics",
            "API access",
        ],
        cta: "Zacznij teraz",
        dark: false,
    },
    {
        id: 2,
        tag: "BESTSELLER",
        name: "Pro",
        price: "129",
        period: "/ mies.",
        description: "Dla rosnących teamów, które potrzebują więcej mocy.",
        features: [
            "Nieograniczone projekty",
            "100 GB storage",
            "Priority support 24/7",
            "Zaawansowane analytics",
            "API access + webhooks",
            "Własna domena",
        ],
        cta: "Wybierz Pro",
        featured: true,
        dark: true,
    },
    {
        id: 3,
        tag: "ENTERPRISE",
        name: "Scale",
        price: "349",
        period: "/ mies.",
        description: "Pełna kontrola i dedykowane wsparcie dla dużych firm.",
        features: [
            "Wszystko z Pro",
            "1 TB storage",
            "Dedykowany opiekun",
            "Custom integrations",
            "SSO / SAML",
            "SLA 99.99%",
            "On-premise option",
        ],
        cta: "Porozmawiaj z nami",
        dark: false,
    },
    
];

export default () => {
    return (
        <div>
            <h1 className="text-4xl md:text-6xl font-serif font-normal tracking-tight text-center text-white">
                Wybierz plan, który najlepiej pasuje do Twoich potrzeb
            </h1>
            <p className="text-center text-zinc-400 mt-4 mb-12">
                Proste i przejrzyste ceny, bez ukrytych kosztów. Anuluj w dowolnym momencie.
            </p>
            <hr className="border-zinc-800 mb-12" />
            <div className="h-full w-full flex items-center justify-center px-6 py-16" id = "offert">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full items-start">
                    {offers.map((offer) => (
                        <PricingCard key={offer.id} offer={offer} />
                    ))}
                </div>
            </div>
        </div>
    );
}