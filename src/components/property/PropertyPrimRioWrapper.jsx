import { useReducer } from "react";
import "./style.css";

export const PropertyPrimRioWrapper = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "prim-rio",
  });

  return (
    <div
      className={`property-prim-rio-wrapper ${state.property1} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      {state.property1 === "prim-rio" && (
        <>
          <div className="div">
            <div className="text-wrapper-2">PESSOAS</div>

            <img
              className="expand-more"
              alt="Expand more"
              src="https://c.animaapp.com/iA1lbPU9/img/expand-more-fill0-wght400-grad0-opsz48-1-3.svg"
            />
          </div>

          <div className="text-wrapper-3">Quantas pessoas?</div>
        </>
      )}

      {state.property1 === "segundo" && (
        <>
          <div className="frame-2">
            <img
              className="person"
              alt="Person"
              src="https://c.animaapp.com/iA1lbPU9/img/person-fill0-wght400-grad0-opsz48-1.svg"
            />

            <div className="text-wrapper-4">1 Pessoa</div>
          </div>

          <div className="frame-2">
            <img
              className="group-fill-wght"
              alt="Group"
              src="https://c.animaapp.com/iA1lbPU9/img/group-fill0-wght400-grad0-opsz48-1-2.svg"
            />

            <div className="text-wrapper-5">2 Pessoas</div>
          </div>

          <div className="frame-2">
            <img
              className="group-fill-wght"
              alt="Group"
              src="https://c.animaapp.com/iA1lbPU9/img/group-fill0-wght400-grad0-opsz48-1-2.svg"
            />

            <div className="text-wrapper-5">3 Pessoas</div>
          </div>

          <div className="frame-2">
            <img
              className="group-fill-wght"
              alt="Group"
              src="https://c.animaapp.com/iA1lbPU9/img/group-fill0-wght400-grad0-opsz48-1-2.svg"
            />

            <div className="text-wrapper-5">4 Pessoas</div>
          </div>
        </>
      )}
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "click":
      return {
        ...state,
        property1: "segundo",
      };
  }

  return state;
}
