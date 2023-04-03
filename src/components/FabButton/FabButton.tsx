import "./FabButton.css";
import crossIcon from "../../assets/icons/cross.svg";

export interface FabButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isOpen: boolean;
}

export function FabButton({ onClick, isOpen }: FabButtonProps) {
  return (
    <button className="fab" onClick={onClick}>
      {isOpen ? (
        <div className="fab-inner">
          <img
            src={crossIcon}
            alt="close"
            style={{ width: "25px", height: "25px" }}
          />
        </div>
      ) : (
        <div className="fab-inner fab-border" />
      )}
    </button>
  );
}
