import "./style.css";

export const Group = ({
  property1,
  className,
  rectangleClassName,
  rectangle = "https://c.animaapp.com/iA1lbPU9/img/rectangle-30.svg",
  locationOn = "https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-1.svg",
  starClassName,
  star = "https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg",
}) => {
  return (
    <div className={`group ${className}`}>
      <img
        className={`img ${rectangleClassName}`}
        alt="Rectangle"
        src={rectangle}
      />

      <div className="frame-7">
        <div className="frame-8">
          <div className="text-wrapper-10">NEW YORK</div>

          <div className="frame-9">
            <img
              className="location-on-fill"
              alt="Location on"
              src={locationOn}
            />

            <div className="text-wrapper-11">ESTADOS UNIDOS</div>
          </div>
        </div>

        <div className="frame-10">
          <div className="frame-11">
            <img className={`star-2 ${starClassName}`} alt="Star" src={star} />

            <p className="p">
              <span className="text-wrapper-12">4,8 </span>

              <span className="text-wrapper-13">(957 Reviews)</span>
            </p>
          </div>

          <div className="frame-12">
            <div className="text-wrapper-14">R$ 3.456,00</div>
          </div>
        </div>
      </div>
    </div>
  );
};
