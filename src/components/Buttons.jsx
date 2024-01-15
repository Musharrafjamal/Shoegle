import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";

const Buttons = ({ btns }) => {
  return (
    <>
      {btns.map((btn, index) => {
        return btn.secondary ? (
          <div key={index} className={btn.width}>
            <SecondaryBtn
              content={btn.content}
              icon={btn.icon}
              linkTag={btn.linkTag}
              destination={btn.destination}
            />
          </div>
        ) : (
          <div key={index} className={btn.width}>
            <PrimaryBtn
              content={btn.content}
              icon={btn.icon}
              linkTag={btn.linkTag}
              destination={btn.destination}
            />
          </div>
        );
      })}
    </>
  );
};

export default Buttons;
