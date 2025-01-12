import { memo } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const LazyImage = memo(({ src, alt, ...props }: LazyImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
});

LazyImage.displayName = "LazyImage";

export default LazyImage;