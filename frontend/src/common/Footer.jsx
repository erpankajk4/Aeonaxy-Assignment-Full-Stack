import React from "react";
import Logo from "./Logo";
import { FaDribbble, FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <>
    <footer className="md:grid grid-cols-2 md:grid-cols-7 md:gap-5 text-[#3E3F51] p-5 border-t border-[#d2d3ee]">
      <div className="col-span-2 md:col-span-2 flex flex-col gap-y-5 mb-5">
        <Logo fillColor="#EA4B8B" />
        <p>Dribbble is the world's leading community for creatives to share, grow, and get hired.</p>
        <div className="flex gap-5">
          <FaFacebookSquare />
          <FaTwitterSquare />
          <FaLinkedin />
          <RiInstagramFill />
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <h6 className="font-bold text-black mb-3">For Designers</h6>
        <ul className="flex flex-col gap-y-3">
          <li><a href="#">Explore Design Work</a></li>
          <li><a href="#">Design Blog</a></li>
          <li><a href="#">Overtime podcast</a></li>
          <li><a href="#">Dribbble meetups</a></li>
          <li><a href="#">Dribbble original</a></li>
          <li><a href="#">Dribbble shops</a></li>
          <li><a href="#">Design Resources</a></li>
          <li><a href="#">Free Design Courses</a></li>
        </ul>
      </div>
      <div className="col-span-2 md:col-span-1">
        <h6 className="font-bold text-black mb-3">Hire Designers</h6>
        <ul className="flex flex-col gap-y-3">
          <li><a href="#">Find a Designer</a></li>
          <li><a href="#">Dribbble jobs</a></li>
          <li><a href="#">Designers for hire</a></li>
          <li><a href="#">Dribbble artists for hire</a></li>
          <li><a href="#">Enterprise</a></li>
        </ul>
        <h6 className="font-bold text-black my-3">Advertise</h6>
        <ul className="flex flex-col gap-y-3">
          <li><a href="#">Advertise with us</a></li>
        </ul>
      </div>
      <div className="col-span-2 md:col-span-1">
        <h6 className="font-bold text-black mb-3">Company</h6>
        <ul className="flex flex-col gap-y-3">
          <li><a href="#">About</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Support</a></li>
          <li><a href="#">API</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#">Legal</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Directory</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </div>
      <div className="col-span-2 md:col-span-1">
        <h6 className="font-bold text-black mb-3">Directors</h6>
        <ul className="flex flex-col gap-y-3">
          <li><a href="#">Design jobs</a></li>
          <li><a href="#">Designers</a></li>
          <li><a href="#">Find work</a></li>
          <li><a href="#">Hire designers</a></li>
          <li><a href="#">Post a job</a></li>
          <li><a href="#">Dribbble Go</a></li>      
        </ul>
        <h6 className="font-bold text-black my-3">Design assets</h6>
        <ul className="flex flex-col gap-y-3">
          <li><a href="#">Logo design</a></li>
          <li><a href="#">Product design</a></li>
          <li><a href="#">Packaging design</a></li>
          <li><a href="#">Illustration</a></li>
          <li><a href="#">Brochure</a></li>
        </ul>
      </div>
      <div className="col-span-2 md:col-span-1">
        <h6 className="font-bold text-black mb-3">Design Resources</h6>
        <ul className="flex flex-col gap-y-3">
          <li><a href="#">Logo design</a></li>
          <li><a href="#">Product design</a></li>
          <li><a href="#">Packaging design</a></li>
          <li><a href="#">Illustration</a></li>
          <li><a href="#">Brochure</a></li>
          <li><a href="#">Infographic</a></li>
          <li><a href="#">Web design</a></li>  
        </ul>
      </div>
    </footer>
    <footer className="flex justify-between p-10 border-t border-[949399] max-md:flex-col max-md:gap-5 max-md:items-center">
      <p className="text-[#949399]">© 2022 Dribbble. All rights reserved.</p>
      <div className="flex gap-1 ">
        <p className="font-bold text-black">20,501,853</p>
        <p className="text-[#949399]">shots dribbled</p>
        <FaDribbble className="text-2xl text-[#a93764] bg-[#EA4B8B] rounded-full" />
      </div>
    </footer>
    </>
  );
}
