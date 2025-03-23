import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
  themeColor?: string;
}

export default function IntroduceView(props: Props) {
  const { className, themeColor } = props;
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col gap-5 justify-center items-center text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-[150px] h-[150px] rounded-full overflow-hidden",
          `bg-${themeColor}`
        )}
      >
        <Image
          src={"/assets/me.png"}
          alt="me"
          width={130}
          height={130}
          className="w-[130px] h-[130px] object-cover"
        />
      </div>
      <div className="flex flex-col sm:gap-4 gap-2">
        <h1 className="sm:text-4xl text-2xl font-bold">
          {"Hi, I'm Ratchaya Suradecharitthikul!"}
        </h1>
        <p className="sm:text-lg text-md max-w-2xl">
          {"I'm a "}
          <span className="font-semibold">{"Full-Stack Developer "}</span>
          {"specializing in "}
          <span className="font-semibold">
            {"Frontend & Mobile Development "}
          </span>
          {
            "with over 4 years of experience. I build modern web and mobile applications using "
          }
          <span className="font-semibold">
            {"React Native, Flutter, Next.js, Laravel, "}
          </span>
          {"and "}
          <span className="font-semibold">{"WordPress"}</span>.
        </p>
        <p className="sm:text-lg text-md max-w-2xl">
          {
            "My passion lies in developing scalable solutions, enhancing user experience, and mentoring junior developers. I thrive on solving complex problems and turning creative ideas into seamless digital experiences."
          }
        </p>
      </div>

      <div className="flex flex-row gap-2">
        <Link
          href={"mailto:ratchaya.gun@gmail.com"}
          className={cn(
            "rounded-full p-3 font-semibold sm:text-md text-sm",
            `bg-${themeColor}`
          )}
        >
          ratchaya.gun@gmail.com
        </Link>
        <Link
          href={"tel:0969413606"}
          className={cn(
            "rounded-full p-3 font-semibold sm:text-md text-sm",
            `bg-${themeColor}`
          )}
        >
          0969413606
        </Link>
      </div>
    </div>
  );
}
