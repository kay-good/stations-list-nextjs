import Image from "next/image";
import Stations from "./components/stations";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <div className="content grow">
          <Stations />
        </div>
    </div>
  );
}