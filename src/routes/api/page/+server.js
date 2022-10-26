import { json } from '@sveltejs/kit';
import fetch from 'node-fetch';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const requestParsed = await request.json();

    const title = requestParsed['title'];

    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${title}`, {
        method: 'get'
    });

    return json(await res.text());
}