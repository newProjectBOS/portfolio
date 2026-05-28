

export default () => {
    return (
        <div 
            className="flex overflow-x-auto snap-x snap-mandatory bg-blue-500 h-screen w-full items-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            <div className="min-w-full h-full flex flex-col justify-center text-white px-8 snap-start">
                <h1 className="text-4xl font-bold mb-6">tu bedzie scrollowanie (nie chce mi sie tego robic)</h1>
                <p className="text-lg max-w-xl">
                    dolor sit amet, consectetur adipiscing elit. Etiam quam nibh, semper ac finibus id, feugiat ac massa.
                </p>
            </div>
            <div className="min-w-full h-full flex flex-col justify-center text-white px-8 snap-start">
                <h1 className="text-4xl font-bold mb-6">Horizontal View 2</h1>
                <p className="text-lg max-w-xl">
                    dolor sit amet, consectetur adipiscing elit. Etiam quam nibh, semper ac finibus id, feugiat ac massa.
                </p>
            </div>
            <div className="min-w-full h-full flex flex-col justify-center text-white px-8 snap-start">
                <h1 className="text-4xl font-bold mb-6">Horizontal View 3</h1>
                <p className="text-lg max-w-xl">
                    Kolejna sekcja. Przeglądarka sama zadba o to, by użytkownik nie mógł się zatrzymać "pomiędzy" slajdami.
                </p>
            </div>
        </div>
    );
};