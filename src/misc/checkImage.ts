const checkImage = async (url: string) => {
  const response = await fetch(url);
  console.log(response)

  try {
    if (response.ok) {
        return url;
      } else {
        return "example.jpg";
      }
  } catch(err: any) {}
};

export default checkImage;
