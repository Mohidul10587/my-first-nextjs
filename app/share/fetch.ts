export const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
