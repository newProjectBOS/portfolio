export default ({ offer }: any) => {
    return (
        <div
            className={[
                "w-full min-w-0 rounded-lg border cursor-pointer transition-colors duration-200",
                offer.dark
                    ? "bg-black border-transparent text-white"
                    : "bg-white border-zinc-200 text-black hover:border-zinc-400",
            ].join(" ")}
        >
            <div className="flex flex-col p-5 sm:p-6 lg:p-7 gap-4 sm:gap-5">
                <div className="min-w-0">
                    <p className="text-[10px] font-pliant tracking-[0.15em] uppercase text-zinc-400 mb-1.5">
                        {offer.tag}
                    </p>
                    <p className={["text-[13px] font-pliant text-pretty", offer.dark ? "text-zinc-500" : "text-zinc-400"].join(" ")}>
                        {offer.description}
                    </p>
                </div>
                <div className="flex flex-wrap items-baseline gap-1.5">
                    <span className={["text-4xl sm:text-5xl font-pliant font-normal leading-none tracking-tight", offer.dark ? "text-white" : "text-black"].join(" ")}>
                        {offer.price}
                    </span>
                    <span className={["text-[11px] font-pliant", offer.dark ? "text-zinc-600" : "text-zinc-400"].join(" ")}>
                        PLN {offer.period}
                    </span>
                </div>
                <ul className="flex flex-col gap-2">
                    {offer.features.map((f: string, i: number) => (
                        <li key={i} className={["text-[13px] font-pliant break-words", offer.dark ? "text-zinc-400" : "text-zinc-500"].join(" ")}>
                            {f}
                        </li>
                    ))}
                </ul>
                <button
                    className={[
                        "w-full min-w-0 py-3 sm:py-2.5 px-2 border rounded-md text-[10px] font-pliant tracking-[0.15em] uppercase transition-colors duration-150",
                        offer.dark
                            ? "text-zinc-300 border-zinc-700 hover:bg-white hover:text-black hover:border-white"
                            : "text-black border-zinc-300 hover:bg-black hover:text-white hover:border-black",
                    ].join(" ")}
                >
                    {offer.cta}
                </button>
            </div>
        </div>
    );
}
