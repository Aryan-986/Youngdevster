import React from 'react';
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#181063] py-8 text-white px-6"> 
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-start gap-4"> 
          <span className="text-lg font-semibold">Explore</span>
          <ul className="list-none">
            <li><a href="#" className="hover:text-[#dfdff0]">Home</a></li>
            <li><a href="#" className="hover:text-[#dfdff0]">Services</a></li>
            <li><a href="#" className="hover:text-[#dfdff0]">About</a></li>
            <li><a href="#" className="hover:text-[#dfdff0]">Contact</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4"> 
          <span className="text-lg font-semibold">Products</span>
          <ul className="list-none">
            <li><a href="#" className="hover:text-[#dfdff0]">About</a></li>
            <li><a href="#" className="hover:text-[#dfdff0]">Work X</a></li>
            <li><a href="#" className="hover:text-[#dfdff0]">Services</a></li>
            <li><a href="#" className="hover:text-[#dfdff0]">Contact</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4"> 
          <span className="text-lg font-semibold">Follow Us</span>
          <ul className="flex gap-4">
            <li><a href="#" className="hover:text-[#dfdff0]"><FaDiscord /></a></li>
            <li><a href="#" className="hover:text-[#dfdff0]"><FaTwitter /></a></li>
            <li><a href="#" className="hover:text-[#dfdff0]"><FaYoutube /></a></li>
            <li><a href="#" className="hover:text-[#dfdff0]"><FaMedium /></a></li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4"> 
          <span className="text-lg font-semibold">Resources</span>
          <ul className="list-none">
            <li><a href="#" className="hover:text-[#dfdff0]">Media Kit</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-sm text-center">
        © Young Devster 2024. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;