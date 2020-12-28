const asset = (path: string) => {
  return `${process.env.NEXT_PUBLIC_CDN}${path}`;
}

export default asset;
