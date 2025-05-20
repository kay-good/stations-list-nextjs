import { RadioBrowserService } from "@/shared/api/apiStationsService";
import { useState, useEffect } from "react";


export function useVoteStation(uuid: string) {
    const [voted, setVoted] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const sendLike = async (uuid: string) => {
        setLoading(true);
        RadioBrowserService.voteForStation(uuid)
            .then((data) => {
                if (data.ok) {
                    setVoted(true);
                } else {
                    setError(data.message || "You have already voted");
                }
            })
            .catch((err) => {
                setError(err.message || "Failed to vote for station");
            })
            .finally(() => setLoading(false));
    }


    return { voted, loading, error, sendLike };
}