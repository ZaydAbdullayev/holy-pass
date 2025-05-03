import "./index.css";

export const HeavenButton = ({ children, onClick }) => {
  return (
    <button className="heaven-btn" onClick={onClick}>
      {children}
    </button>
  );
};

export const InfernalButton = ({ children, onClick }) => {
  return (
    <button className="infernal-btn" onClick={onClick}>
      {children}
    </button>
  );
};
