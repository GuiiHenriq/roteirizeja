import "./style.css";

export const Frame = ({ property1, className }) => {
  return (
    <div className={`frame ${className}`}>
      <div className="text-wrapper">SIGN UP</div>
    </div>
  );
};
