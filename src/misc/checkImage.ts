let pathDefaultImage = "question.svg"

const checkImage = async (url: string) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return url;
    }

    return pathDefaultImage;
  } catch (err: any) {
    return pathDefaultImage;
  }
};

export default checkImage;
