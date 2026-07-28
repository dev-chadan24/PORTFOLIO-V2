import { useState } from "react";
import { motion } from "framer-motion";

type ImageWithSkeletonProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function ImageWithSkeleton({ className, alt, ...props }: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse", ease: "easeInOut" }}
          className={`absolute inset-0 bg-elevated/40 skeleton-shimmer ${className || ""}`}
          aria-hidden
        />
      )}
      <img
        alt={alt}
        className={`${className || ""} transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </>
  );
}
