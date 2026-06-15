export default (props: any) => {
  return (
    <>
      <a href={props.href} target="_blank">
        <img
          src={props.src}
          alt={props.alt}
          className="h-16 w-16 mx-auto hover:scale-110 transition-transform hover:cursor-pointer"
        />
      </a>
    </>
  );
};
