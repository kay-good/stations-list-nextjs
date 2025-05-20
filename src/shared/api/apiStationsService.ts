import { Station } from "../types/types";
import { rootFetcher } from "../utils/fetcher";

type BaseUrlResponse = { 
    url: string 
};
type VoteResponse = {
    ok: boolean;
    message: string;
};


export class RadioBrowserService {
    static async fetchBaseUrl(): Promise<string> {
        const res = await rootFetcher<BaseUrlResponse>('/api/baseUrl');
        if (!res.url) {
            throw new Error("Base URL not found");
        }
        return res.url;
    }

    static async fetchPopularStations(page: number, limit = 10): Promise<Station[]> {
        const baseUrl = await this.fetchBaseUrl();
       
        return rootFetcher<Station[]>(`${baseUrl}/json/stations/topvote?offset=${page * limit}&limit=${limit}&hidebroken=true`);
    }

    static async voteForStation(uuid: string): Promise<VoteResponse> {
        const baseUrl = await this.fetchBaseUrl();

        return rootFetcher<VoteResponse>(`${baseUrl}/json/vote/${uuid}`);
    }
}