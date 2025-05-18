import { useState } from "react";
import { Station } from "../types/types";

export default function StationCard({ station, url, index }: { station: Station, url: string, index: number }) {
    const [voted, setVoted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function sendLike(uuid: string) {
        try {
            const response = await fetch(`${url}/json/vote/${uuid}`)
            if (!response.ok) {
                throw new Error("Failed to vote for the station")
            }
            const data = await response.json()
            if (!data.ok) {
                throw new Error("You have already voted")
            }
            setVoted(true)

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

    function handleClick() {
        sendLike(station.stationuuid)
    }

    return (
        <div className="">
            <div className="flex flex-row justify-between">
                <div className="flex justify-center items-center text-6xl text-white font-bold max-w-1/10">
                    {index + 1}.
                </div>
                <div className="flex-grow-1 shrink-0 bg-white mb-2 border rounded-full border-red-50 p-2 px-15 max-w-9/10">
                    <div className="flex flex-row justify-between items-center">
                        <div className="py-4 pr-2 truncate">
                            <div className="text-3xl font-bold truncate">{station.name}</div>
                            <div className="truncate">stream url: <a href="{station.url}">{station.url}</a></div>
                            <div className="truncate">website: <a href="{station.homepage}">{station.homepage}</a></div>
                            <div className="truncate">country: {station.country}</div>
                        </div>
                        <button className="aspect-1/1" onClick={handleClick}>
                            <div className={"like w-10 h-10" + (loading ? "loading" : "")}></div>
                        </button>
                    </div>
                </div>
            </div>
            {error && <div className="text-right border border-red-600 rounded-full pr-4 bg-red-300 mb-2">{error}</div>}
        </div>


    )
}