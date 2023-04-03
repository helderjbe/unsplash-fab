import React, { useRef, useState } from "react";
import { FabButton } from "../components/FabButton";
import { ImageGrid } from "../components/ImageGrid";
import { Popover } from "../components/Popover";
import { SearchField } from "../components/SearchField";
import { UnsplashImage } from "../types/unsplash";
import { debounceSearch } from "../utils/debounce";
import "./App.css";

const unsplashApiUrl = "https://api.unsplash.com/search/photos";
const unsplashApiKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function App() {
  const latestRequestId = useRef(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    UnsplashImage | undefined
  >();
  const [images, setImages] = useState<UnsplashImage[]>([]);

  const handleSearch = async (query: string, requestId: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${unsplashApiUrl}?query=${query}&per_page=12&client_id=${unsplashApiKey}`,
        {
          headers: {
            Authorization: `Client-ID ${unsplashApiKey}`,
          },
        }
      );
      const data = await response.json();

      if (requestId === latestRequestId.current) {
        setImages(data.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setSearch(value);

    const requestId = latestRequestId.current + 1;
    latestRequestId.current = requestId;
    debounceSearch(() => handleSearch(value, requestId), 250);
  };

  const handleSelectImage = (image: UnsplashImage) => {
    setSelectedImage(image);
    setShowPopover(false);
  };

  return (
    <div>
      {selectedImage && (
        <img
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description || "selected"}
          className="selected-image"
        />
      )}
      <Popover show={showPopover} onClose={() => setShowPopover(false)}>
        <SearchField search={search} onChange={handleInputChange} />
        <ImageGrid
          isLoading={loading}
          images={images}
          onSelect={handleSelectImage}
        />
      </Popover>
      <FabButton
        isOpen={showPopover}
        onClick={() => setShowPopover((prevShow) => !prevShow)}
      />
    </div>
  );
}

export default App;
