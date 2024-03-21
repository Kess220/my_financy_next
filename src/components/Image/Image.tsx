import Image from "next/image";

const LogoImage = () => (
  <Image src="/logo.jpg" alt="Logo" className="logo" width={100} height={100} priority />
);

export default LogoImage;
