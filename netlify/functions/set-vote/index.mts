import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";
type DataItem = {
    song_rank: string;
    count: number;
}

export default async (req: Request, _context: Context) => {
    const { song_rank } = await req.json();


    const store = getStore({
        name: process.env.NETLIFY_BLOB_STORE_NAME!,
        siteID: process.env.NETLIFY_SITE_ID!,
        token: process.env.NETLIFY_AUTH_TOKEN!,
    });

    const votes = await store.get(process.env.NETLIFY_BLOB_KEY_NAME!);
    // find song in votes and increment count
    const votesData: DataItem[] = JSON.parse(votes);
    const songIndex = votesData.findIndex((item) => item.song_rank === song_rank);

    if (songIndex !== -1) {
        votesData[songIndex].count++;
    }

    await store.set(process.env.NETLIFY_BLOB_KEY_NAME!, JSON.stringify(votesData));

    return new Response(
        JSON.stringify(votesData),
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
}
