type Props = {
  image: { src: string; alt: string; w: number; h: number };
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// AVIF with WebP fallback, intrinsic size reserved to keep CLS at zero.
export function Picture({ image, className = "photo", priority = false }: Props) {
  return (
    <picture>
      <source srcSet={`${image.src}.avif`} type="image/avif" />
      <img
        src={`${image.src}.webp`}
        alt={image.alt}
        width={image.w}
        height={image.h}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
