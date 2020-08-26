type IPResponse = {
  ip: string;
  latitude: number;
  longitude: number;
};

export async function getPublicIPData(): Promise<IPResponse> {
  const result = await fetch('https://ipapi.co/json');
  return (await result.json()) as IPResponse;
}
