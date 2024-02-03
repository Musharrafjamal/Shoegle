import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";

const Buttons = ({ btns }) => {
  return (
    <>
      {btns !== undefined &&
        btns.map((btn, index) => {
          return btn.secondary ? (
            <div key={index} className="py-2 flex justify-center">
              <SecondaryBtn
                content={btn.content}
                icon={btn.icon}
                destination={btn.destination}
              />
            </div>
          ) : (
            <div key={index}  className="py-2 flex justify-center">
              <PrimaryBtn
                content={btn.content}
                icon={btn.icon}
                destination={btn.destination}
              />
            </div>
          );
        })}
    </>
  );
};

export default Buttons;
