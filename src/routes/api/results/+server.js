import { json } from '@sveltejs/kit';
import fetch from 'node-fetch';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const requestParsed = await request.json();

    const searchValue = requestParsed['searchValue'];
    const searchLimit = requestParsed['limit'];

    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${searchValue}&namespace=0&limit=${searchLimit}`, {
        method: 'get'
    });

    return json(await res.json());
}