export default ({ service }: any) => {
    return (
        <div className="w-full min-w-0 rounded-lg border bg-white border-zinc-200 text-black hover:border-zinc-400 cursor-pointer transition-colors duration-200">
            <div className="flex flex-col p-5 sm:p-6 lg:p-7 gap-4 sm:gap-5 min-h-45 sm:min-h-55">
                <p className="text-[10px] font-pliant tracking-[0.15em] uppercase text-zinc-400">
                    {service.number}
                </p>
                <h2 className="text-2xl sm:text-3xl font-pliant font-normal leading-tight tracking-tight text-balance text-black mt-auto">
                    {service.title}
                </h2>
                <p className="text-[13px] font-pliant text-pretty text-zinc-500">
                    {service.text}
                </p>
            </div>
        </div>
    );
}
