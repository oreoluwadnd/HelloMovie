import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-dark">
      <div className="max-w-[1536px] mx-auto flex flex-col min-h-screen font-inter h-full w-full ">
        <Header />
        <main className=" my-[32px] w-full flex-1 h-full min-h-[calc(100%-72px)] flex flex-col gap-10 justify-center items-center">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
