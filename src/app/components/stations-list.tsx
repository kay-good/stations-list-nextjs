"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ButtonMore from "./button-load-more";
import StationCard from "./station-card";
import { Station } from "../types/types";



export default function StationsList({ url }: { url: string }) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const pageLimit = 10

    const [stations, setStations] = useState<Station[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [moreButtonVisible, setMoreButtonVisible] = useState(false)

    async function fetchStations(page: number) {
        setLoading(true)
        try {
            const response = await fetch(`${url}/json/stations/topvote?offset=${page * pageLimit}&limit=${pageLimit}&hidebroken=true`)
            if (!response.ok) {
                throw new Error("Failed to fetch stations")
            }
            const data = await response.json()
            if (data) {
                setMoreButtonVisible(true)
            } else {
                setMoreButtonVisible(false)
            }
            //console.log([...stations, ...data])
            if (currentPage === 1) {
                setStations(data)
            } else {
                setStations(prevData => [...prevData, ...data])
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("An unknown error occured")
            }
        } finally {
            setLoading(false)
        }
    }

    
    useEffect(() => {
        console.log(currentPage)
        
        fetchStations(currentPage)
    }, [searchParams])

    return (
        <div>
            {stations.map((station: Station, index: number) => (
                <StationCard station={station} url={url} index={index} key={station.stationuuid} />
            ))}
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && moreButtonVisible && <ButtonMore />}
        </div>
    )
}