import { UnsplashImage } from "../../types/unsplash";
import "./ImageGrid.css";
import Masonry from "react-masonry-css";

export interface ImageGridProps {
  isLoading: boolean;
  images: UnsplashImage[];
  onSelect: (image: UnsplashImage) => void;
}

export function ImageGrid({ isLoading, images, onSelect }: ImageGridProps) {
  return (
    <Masonry
      breakpointCols={2}
      className="image-grid"
      columnClassName="image-grid-column"
    >
      {isLoading
        ? [...Array(12)].map((_, index) => (
            <button
              disabled
              key={`skeleton ${index}`}
              className="image-button"
              style={{ width: "100%", height: "50%" }}
            />
          ))
        : images.map((image) => (
            <button
              key={image.id}
              className="image-button"
              onClick={() => onSelect(image)}
            >
              <img
                src={image.urls.small}
                alt={image.alt_description || "unsplash"}
                className="image"
              />
            </button>
          ))}
    </Masonry>
  );
}
