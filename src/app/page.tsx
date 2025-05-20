import Header from "@/shared/ui/Header";
import StationsList from "@/widgets/stationsList/ui/StationList";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="content grow">
        <div className="container mx-auto py-4">
          <h1 className="text-3xl font-bold text-center mb-2">List of popular stations</h1>
          <StationsList />
        </div>
      </div>
    </div>
  );
}