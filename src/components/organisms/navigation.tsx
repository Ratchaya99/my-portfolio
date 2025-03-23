"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/lib/provider/app-context-provider";
import { cn } from "@/lib/utils";

interface MenuType {
  title: string;
  action: string;
}

const MenuList: MenuType[] = [
  { title: "About", action: "#about" },
  { title: "Highlighted Projects", action: "#hilighted-projects" },
];

export default function Navigation() {
  const { themeColor, setThemeColor } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeChange = (color: string) => {
    setThemeColor(color);
  };

  const handleMenuClick = (menuTitle: string) => {
    setActiveMenu(menuTitle);
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  const getBorderColor = () => {
    switch (themeColor) {
      case "blue-200":
        return "border-blue-200";
      case "lime-300":
        return "border-lime-300";
      default:
        return "border-black";
    }
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled || isMenuOpen
          ? "bg-gray-100 border-b border-b-slate-200"
          : "bg-transparent"
      )}
    >
      <div className="max-w-screen-lg mx-auto flex justify-end items-center gap-4 px-6 h-[70px]">
        {/* Menu in Desktop view */}
        <div className="hidden lg:flex gap-4">
          {MenuList.map((menu) => (
            <Link
              key={`menu-${menu.title}`}
              href={menu.action}
              className={cn(
                "text-black font-bold",
                activeMenu === menu.title
                  ? `border-b-2 border-dashed ${getBorderColor()}`
                  : ""
              )}
              onClick={() => handleMenuClick(menu.title)}
            >
              {menu.title}
            </Link>
          ))}
        </div>

        {/* Theme Change Buttons */}
        <div className="border rounded-full flex flex-row p-2">
          <button
            className={cn(
              "w-[25px] h-[25px] rounded-l-full bg-blue-200",
              themeColor === "blue-200" ? "border border-blue-300" : ""
            )}
            onClick={() => handleThemeChange("blue-200")}
          ></button>
          <button
            className={cn(
              "w-[25px] h-[25px] rounded-r-full bg-lime-300",
              themeColor === "lime-300" ? "border border-lime-400" : ""
            )}
            onClick={() => handleThemeChange("lime-300")}
          ></button>
        </div>

        {/* Hamburger Menu in Mobile view */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-black font-bold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-4xl leading-[1.5rem]">&#9776;</span>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-[70px] right-0 w-full bg-gray-100 shadow-md flex flex-col items-center gap-4 py-4`}
          >
            {MenuList.map((menu) => (
              <Link
                key={`menu-${menu.title}`}
                href={menu.action}
                className={cn(
                  "text-black font-bold",
                  activeMenu === menu.title
                    ? `border-b-2 border-dashed ${getBorderColor()}`
                    : ""
                )}
                onClick={() => handleMenuClick(menu.title)}
              >
                {menu.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
