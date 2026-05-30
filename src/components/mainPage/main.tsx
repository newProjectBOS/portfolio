export default () => {
    return (
      <div
        className="relative flex overflow-x-auto"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {/* Tło GIF - fixed za całą zawartością */}
        <div className="fixed inset-0 -z-10">
          <img
            src="background.gif"
            className="w-full h-full object-cover"
          />
          {/* Przyciemnienie */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
  
        <div
          className="min-w-full h-screen pt-24 flex items-center justify-center"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-3xl px-4 text-white">
            <h1 className="text-4xl font-bold mb-4">Lorem ipsum</h1>
            <p className="leading-relaxed text-lg">dolor sit amet...</p>
          </div>
        </div>
      </div>
    );
  };