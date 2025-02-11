import NavBar from "@/components/header";
import { Metadata } from "next";
import Hero from "@/app/about/Hero";
import LegalDoc from "@/app/about/LegalDoc";

export const metadata: Metadata = {
  title: "Refinaid | About",
  description: "We are Refinaid.",
};

export default function About() {
  return (
    <>
      <NavBar />
      <div className="mb-20 mt-32 flex flex-col items-center justify-center sm:mb-64 sm:mt-36">
        <Hero />
        {/* <LegalDoc
          hrefPdf="https://cdn.linkscape.app/Certificate_of_Status.pdf"
          imgSrc="https://cdn.linkscape.app/Certificate_of_Status.png"
          imgWidth={250}
          imgHeight={933}
          imgAlt=""
          text="Certificate of Status"
        /> */}
      </div>
    </>
  );
}
