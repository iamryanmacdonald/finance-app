import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center lg:flex">
        <Image alt="logo" height={28} src="logo.svg" width={28} />
        <p className="ml-2.5 text-2xl font-semibold text-white">Finance</p>
      </div>
    </Link>
  );
};
