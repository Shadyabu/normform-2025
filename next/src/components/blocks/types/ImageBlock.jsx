import Image from 'next/image';

const ImageBlock = ({ value }) => {

  if (!value) return null;

  return (
    <Image
      src={ value?.url }
      alt={ value.altText ?? '' }
      width={ value.width }
      height={ value.height }
    />
  )
};

export default ImageBlock;