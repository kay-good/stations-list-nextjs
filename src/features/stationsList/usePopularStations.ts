import { RadioBrowserService } from "@/shared/api/apiStationsService";
import { Station } from "@/shared/types/types";
import { useState, useEffect } from "react";


export function usePopularStations(page: number) {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    RadioBrowserService.fetchPopularStations(page)
      .then((data) => {
        if (page === 1) {
          setStations(data)
        } else {
          setStations([...stations, ...data])
        }
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch stations");
      })
      .finally(() => setLoading(false));
  }, [page]);

  return { stations, loading, error };
}