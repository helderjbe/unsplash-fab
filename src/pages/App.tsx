import { useState } from "react";
import { FabButton } from "../components/FabButton";
import { GiphyPopover } from "../components/GiphyPopover";
import { SelectedImage } from "../components/SelectedImage";
import { UnsplashImage } from "../types/unsplash";
import "./App.css";

function App() {
  const [showPopover, setShowPopover] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    UnsplashImage | undefined
  >();

  return (
    <div>
      {selectedImage && <SelectedImage image={selectedImage} />}
      {showPopover && (
        <GiphyPopover
          setSelectedImage={setSelectedImage}
          setShowPopover={setShowPopover}
        />
      )}
      <FabButton
        isOpen={showPopover}
        onClick={() => setShowPopover((prevShow) => !prevShow)}
      />
    </div>
  );
}

export default App;
