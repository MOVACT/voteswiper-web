const storyblokDimensions = (
  filename: string
): { width: number; height: number } => {
  const split = filename.split('/');
  const dimensions = split[split.length - 3].split('x');

  return {
    width: parseInt(dimensions[0]),
    height: parseInt(dimensions[1]),
  };
};

export default storyblokDimensions;
