import { CarouselBooks } from "@/components/HomePage/CarouselBooks";
import Navbar from "@/components/Navbar";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <CarouselBooks />
      <div>

      </div>
    </div>
  );
}
