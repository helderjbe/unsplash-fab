import { UnsplashImage } from "../../types/unsplash";
import "./SelectedImage.css";

export interface SelectedImageProps {
  image: UnsplashImage;
}

export function SelectedImage({ image }: SelectedImageProps) {
  return (
    <img
      src={image.urls.regular}
      alt={image.alt_description || "selected"}
      className="selected-image"
    />
  );
}
