export default ({ service }: any) => {
    return (
        <div className="w-full min-w-0 h-full rounded-lg border border-zinc-200 hover:border-zinc-400 cursor-pointer transition-colors duration-200 text-white">
            <div className="flex flex-col h-full min-h-64 sm:min-h-[19rem] lg:min-h-[21rem] p-5 sm:p-6 lg:p-7 gap-3 sm:gap-4">
                <p className="text-[10px] font-pliant tracking-[0.15em] uppercase text-zinc-400">
                    {service.number}
                </p>
                <h2 className="text-2xl sm:text-3xl font-pliant font-normal leading-tight tracking-tight text-balance text-white hover:text-zinc-400">
                    {service.title}
                </h2>
                <p className="text-md font-pliant text-pretty text-zinc-500">
                    {service.text}
                </p>
            </div>
        </div>
    );
}
