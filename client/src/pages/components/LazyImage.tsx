import React, { useEffect, useRef, useState } from "react";

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  placeholderClassName?: string;
  rootMargin?: string;
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="; //1x1 transparent

export default function LazyImage({
  src,
  alt = "",
  className,
  placeholderClassName,
  rootMargin = "200px",
  fallbackSrc = DEFAULT_FALLBACK,
  onLoad,
  loading = "lazy",
  ...imgProps
}: LazyImageProps) {
  const [shouldLoad, setShouldLoad] = useState<boolean>(
    loading === "eager" || (typeof window !== "undefined" && "loading" in HTMLImageElement.prototype)
  );
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (shouldLoad) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { rootMargin }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [rootMargin, shouldLoad]);

  const finalSrc = src ?? fallbackSrc;

  return (
    <>
      {!loaded && <div className={placeholderClassName} aria-hidden="true" />}
      {shouldLoad ? (
        <img
          ref={ref}
          src={finalSrc}
          alt={alt}
          className={`${className ?? ""} ${loaded ? "" : "opacity-0"}`}
          loading={loading}
          decoding="async"
          onLoad={(e) => {
            setLoaded(true);
            onLoad?.(e);
          }}
          {...imgProps}
        />
      ) : (
        <img ref={ref} alt="" style={{ display: "none" }} />
      )}
    </>
  );
}
