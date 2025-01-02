import "./style.css";

export const Component = ({
  property1,
  className,
  rectangle = "https://c.animaapp.com/iA1lbPU9/img/rectangle-28.svg",
  locationOn = "https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1.svg",
}) => {
  return (
    <div className={`component ${className}`}>
      <img className="rectangle" alt="Rectangle" src={rectangle} />

      <div className="frame-3">
        <div className="text-wrapper-6">ROMA</div>

        <div className="frame-4">
          <img className="location-on" alt="Location on" src={locationOn} />

          <div className="text-wrapper-7">ITÁLIA</div>
        </div>
      </div>

      <div className="frame-5">
        <div className="frame-6">
          <img
            className="star"
            alt="Star"
            src="https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg"
          />

          <p className="element-reviews">
            <span className="span">4,8 </span>

            <span className="text-wrapper-8">(957 Reviews)</span>
          </p>
        </div>

        <div className="div-wrapper">
          <div className="text-wrapper-9">R$ 4.477,00</div>
        </div>
      </div>
    </div>
  );
};
