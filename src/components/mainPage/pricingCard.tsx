export default ({ offer }: any) => {
    return (
        <div
            className={[
                "w-full rounded-lg border cursor-pointer transition-colors duration-200",
                offer.dark
                    ? "bg-black border-transparent text-white"
                    : "bg-white border-zinc-200 text-black hover:border-zinc-400",
            ].join(" ")}
        >
            <div className="flex flex-col p-7 gap-5">
                {/* Name + description */}
                <div>
                    <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-zinc-400 mb-1.5">
                        {offer.tag}
                    </p>
                    <p className={["text-[13px] font-mono", offer.dark ? "text-zinc-500" : "text-zinc-400"].join(" ")}>
                        {offer.description}
                    </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5">
                    <span className={["text-5xl font-serif font-normal leading-none tracking-tight", offer.dark ? "text-white" : "text-black"].join(" ")}>
                        {offer.price}
                    </span>
                    <span className={["text-[11px] font-mono", offer.dark ? "text-zinc-600" : "text-zinc-400"].join(" ")}>
                        PLN {offer.period}
                    </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2">
                    {offer.features.map((f: string, i: number) => (
                        <li key={i} className={["text-[13px] font-mono", offer.dark ? "text-zinc-400" : "text-zinc-500"].join(" ")}>
                            {f}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <button
                    className={[
                        "w-full py-2.5 border rounded-md text-[10px] font-mono tracking-[0.15em] uppercase transition-colors duration-150",
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