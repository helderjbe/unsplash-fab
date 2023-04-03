import { useRef, useState } from "react";
import { UNSPLASH_API_KEY, UNSPLASH_API_URL } from "../../config";
import { UnsplashImage } from "../../types/unsplash";
import { debounceSearch } from "../../utils/debounce";
import { ImageGrid } from "../ImageGrid";
import { Popover } from "../Popover";
import { SearchField } from "../SearchField";

export interface GiphyPopoverProps {
  setSelectedImage: (image: UnsplashImage) => void;
  setShowPopover: (show: boolean) => void;
}

export function GiphyPopover({
  setShowPopover,
  setSelectedImage,
}: GiphyPopoverProps) {
  const latestRequestId = useRef(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<UnsplashImage[]>([]);

  const handleSearch = async (query: string, requestId: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}?query=${query}&per_page=12&client_id=${UNSPLASH_API_KEY}`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
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
    <Popover onClose={() => setShowPopover(false)}>
      <SearchField search={search} onChange={handleInputChange} />
      <ImageGrid
        isLoading={loading}
        images={images}
        onSelect={handleSelectImage}
      />
    </Popover>
  );
}
