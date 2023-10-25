import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-start items-center  w-full h-14 md:h-16 lg:h-16  py-4 px-4 md:px-5 lg:px-[72px]">
      <img
        data-testid="headerLogo"
        onClick={() => navigate("/")}
        src="/logos/header-logo.svg"
        alt="header-img"
        className=" h-6 md:h-8 lg:h-8 cursor-pointer"
      />
    </header>
  );
}
