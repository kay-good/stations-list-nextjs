import { useState } from "react";
import { useVoteStation } from "@/features/voteStation/useVoteSation";
import { Station } from "@/shared/types/types";

export default function StationCard({ station, index }: { station: Station, index: number }) {
    const { sendLike, loading, error } = useVoteStation(station.stationuuid);

    function handleClick() {
        sendLike(station.stationuuid)
    }

    return (
        <div className="">
            <div className="flex flex-row justify-between">
                <div className="flex justify-center items-center text-6xl text-white dark:text-gray-100 font-bold max-w-1/10">
                    {index + 1}.
                </div>
                <div className="flex-grow-1 shrink-0 bg-white dark:bg-gray-800 mb-2 border rounded-full border-red-50 p-2 px-15 max-w-9/10">
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