import React from "react";
import Logo from "../../common/Logo";
import img from "../../assets/img/1.png"
import { Link } from "react-router-dom";
export default function AsideBanner() {
  return (
    <aside className="md:col-span-4 hidden md:flex flex-col gap-y-5 bg-[#F4D086] pt-[10%] md:h-screen">
      <div className="pl-[10%]">
      <Logo fillColor="#c1943b" />
      </div>
      <h4 className="text-[#886318] text-2xl font-bold pl-[10%]">Discover the world's top <br /> Designers & Creatives</h4>
      <img src={img} alt="" className="w-full h-max object-cover" />
      <p className="text-[#886318] font-medium pl-[10%]">Art by <Link className="underline" to="#"> Peter Tarka</Link></p>
    </aside>
  );
}
