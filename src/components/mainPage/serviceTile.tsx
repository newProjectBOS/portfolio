export default ({ service }: any) => {
    const Icon = service.icon;

    return (
        <a
            href={service.href}
            className={[
                "group w-full min-w-0 rounded-lg border cursor-pointer transition-colors duration-200",
                service.dark
                    ? "bg-black border-transparent text-white hover:border-zinc-700"
                    : "bg-white border-zinc-200 text-black hover:border-zinc-400",
            ].join(" ")}
        >
            <div className="flex flex-col h-full p-5 sm:p-6 lg:p-7 gap-4 sm:gap-5">
                <div className="min-w-0">
                    <div
                        className={[
                            "flex items-center justify-center w-10 h-10 mb-4 rounded-md border",
                            service.dark
                                ? "border-zinc-800 text-white"
                                : "border-zinc-200 text-black",
                        ].join(" ")}
                    >
                        <Icon size={17} />
                    </div>
                    <p className="text-[10px] font-pliant tracking-[0.15em] uppercase text-zinc-400 mb-1.5">
                        {service.tag}
                    </p>
                    <h3 className={["text-xl sm:text-2xl font-pliant font-normal leading-tight tracking-tight text-balance", service.dark ? "text-white" : "text-black"].join(" ")}>
                        {service.title}
                    </h3>
                    <p className={["text-[13px] font-pliant text-pretty mt-2", service.dark ? "text-zinc-500" : "text-zinc-400"].join(" ")}>
                        {service.description}
                    </p>
                </div>
                <ul className="flex flex-col gap-2">
                    {service.features.map((f: string, i: number) => (
                        <li key={i} className={["text-[13px] font-pliant break-words", service.dark ? "text-zinc-400" : "text-zinc-500"].join(" ")}>
                            {f}
                        </li>
                    ))}
                </ul>
                <div
                    className={[
                        "mt-auto w-full min-w-0 flex items-center justify-center gap-2 py-3 sm:py-2.5 px-2 border rounded-md text-[10px] font-pliant tracking-[0.15em] uppercase transition-colors duration-150",
                        service.dark
                            ? "text-zinc-300 border-zinc-700 group-hover:bg-white group-hover:text-black group-hover:border-white"
                            : "text-black border-zinc-300 group-hover:bg-black group-hover:text-white group-hover:border-black",
                    ].join(" ")}
                >
                    {service.cta}
                </div>
            </div>
        </a>
    );
}
