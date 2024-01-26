import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";

const Buttons = ({ btns }) => {
  return (
    <>
      {btns !== undefined &&
        btns.map((btn, index) => {
          return btn.secondary ? (
            <div key={index}>
              <SecondaryBtn
                content={btn.content}
                icon={btn.icon}
                destination={btn.destination}
              />
            </div>
          ) : (
            <div key={index}>
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
