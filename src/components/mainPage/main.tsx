import TypewriterText from "../../effects/TypewriterText"
import SlideInText from "../../effects/SlideInText"

export default () => {
  return (
    <div
      className="relative flex overflow-x-auto"
      style={{ scrollSnapType: "x mandatory" }}
    >
      <div className="fixed inset-0 -z-10">
        <img
          src="background.gif"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div
        className="min-w-full h-screen pt-24 flex items-end justify-start"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="max-w-3xl px-4 pb-100 pl-24 text-white">
          <SlideInText
            text="Lorem ipsum"
          />
          
          <TypewriterText
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ipsum at tortor dignissim volutpat et eget lacus."
            speed={50}
            deleteSpeed={30}
            pauseDuration={2000}
            loop={false}
            className="mt-8 text-md font-medium text-white text-2xl md:text-4xl"
            showCursor={true}
          />
        </div>
      </div>
    </div>
  );
};
