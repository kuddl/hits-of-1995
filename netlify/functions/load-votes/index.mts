import { getStore } from "@netlify/blobs";

export default async () => {
    const store = getStore({
        name: process.env.NETLIFY_BLOB_STORE_NAME!,
        siteID: process.env.NETLIFY_SITE_ID!,
        token: process.env.NETLIFY_AUTH_TOKEN!,
    });

    const votes = await store.get(process.env.NETLIFY_BLOB_KEY_NAME!);
    return new Response(
        votes,
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
}
