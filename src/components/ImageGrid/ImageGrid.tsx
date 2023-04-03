import { UnsplashImage } from "../../types/unsplash";
import "./ImageGrid.css";
import Masonry from "react-masonry-css";

export interface ImageGridProps {
  isLoading: boolean;
  images: UnsplashImage[];
}

export function ImageGrid({ isLoading, images }: ImageGridProps) {
  return (
    <Masonry
      breakpointCols={2}
      className="image-grid"
      columnClassName="image-grid-column"
    >
      {isLoading
        ? [...Array(12)].map((_, index) => (
            <div key={`skeleton ${index}`} className="image">
              <div style={{ paddingBottom: "75%" }}></div>
            </div>
          ))
        : images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description || "unsplash"}
              className="image"
            />
          ))}
    </Masonry>
  );
}
