export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
