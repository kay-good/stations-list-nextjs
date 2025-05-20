"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation';
import { usePopularStations } from "@/features/stationsList/usePopularStations";
import { Station } from "@/shared/types/types";
import ButtonMore from "@/shared/ui/ButtonMore";
import StationCard from "@/widgets/stationCard/ui/StationCard";


export default function StationsList() {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

    useEffect(() => {
        console.log("searchParams", currentPage)
        setCurrentPage(Number(searchParams.get('page')) || 1);
    }, [searchParams]);

    const [moreButtonVisible, setMoreButtonVisible] = useState(false)

    const { stations, loading, error } = usePopularStations(currentPage);

    useEffect(() => {
        setMoreButtonVisible(stations.length > 0);
    }, [stations.length]);

    return (
        <div>
            {stations.map((station: Station, index: number) => (
                <StationCard station={station} index={index} key={station.stationuuid} />
            ))}
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && moreButtonVisible && <ButtonMore />}
        </div>
    )
}