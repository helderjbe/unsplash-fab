import React, { useState } from "react";
import { FabButton } from "../components/FabButton";
import { Popover } from "../components/Popover";
import { SearchField } from "../components/SearchField";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div>
      <Popover show={showPopover} onClose={() => setShowPopover(false)}>
        <SearchField search={search} onChange={setSearch} />
      </Popover>
      <FabButton
        isOpen={showPopover}
        onClick={() => setShowPopover((prevShow) => !prevShow)}
      />
    </div>
  );
}

export default App;
