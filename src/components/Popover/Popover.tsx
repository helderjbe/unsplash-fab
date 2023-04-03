import { useEffect } from "react";
import "./Popover.css";

export interface PopoverProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function Popover({ children, onClose }: PopoverProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popover = document.getElementById("popover");
      if (popover && !popover.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popover-background" onClick={onClose}>
      <div className="popover-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
