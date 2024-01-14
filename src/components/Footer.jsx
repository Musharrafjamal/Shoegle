import React from "react";
import icon from "../assets/logo/running.png";
import { FaLocationDot } from "react-icons/fa6";
import instagram from "../assets/social-icons/instagram.svg";
import twitter from "../assets/social-icons/Twitter.svg";
import linkedin from "../assets/social-icons/linkedin.svg";

const Footer = () => {
  return (
    <div className="w-full bg-stone-700 text-white flex justify-between px-8">
      <div className="flex flex-col justify-between py-6 gap-16 px-4">
        <div className="flex gap-2 items-center">
          <img src={icon} alt="logo" className="w-20" />
          <span className="text-3xl font-semibold">Shoegle</span>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center">
            <FaLocationDot /> India
          </span>
          <span>© 2023 Shoegle, Inc. All Rights Reserved</span>
        </div>
      </div>
      <div className="flex flex-col justify-evenly">
        <a href="https://www.instagram.com/musharraf_codeverse" target="_blank">
          <img
            src={instagram}
            alt="Instagram"
            className="w-10 cursor-pointer"
            title="instagram"
          />
        </a>
        <a href="https://www.linkedin.com/in/musharrafjamal8" target="_blank">
          <img
            src={linkedin}
            alt="LinkedIn"
            className="w-10 cursor-pointer"
            title="LinkedIn"
          />
        </a>
        <a href="https://twitter.com/MusharrafJamal8" target="_blank">
          <img
            src={twitter}
            alt="TwitterX"
            className="w-10 cursor-pointer"
            title="TwitterX"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
