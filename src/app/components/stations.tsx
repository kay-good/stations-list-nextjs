import { getUrl } from "@/app/lib/utils"
import StationsList from "./stations-list"
import Link from "next/link"
import { Suspense } from 'react'

export default async function Stations() {
    const url = await getUrl()

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-3xl font-bold text-center mb-2">List of popular stations</h1>
            <Suspense>
                <StationsList url={url} />
            </Suspense>
        </div>
    )
}