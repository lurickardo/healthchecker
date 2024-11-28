interface ImageProps {
  className?: string;
  src: string;
  alt: string;
}

export default function Image({ className, src, alt }: ImageProps) {
  return (
    <img className={`h-14 w-auto ${className || ""}`} src={src} alt={alt} />
  );
}
