export interface IPData {
  query: string;
  lat: number;
  lon: number;
  city: string;
  regionName: string;
  country: string;
}

export async function getPublicIPData(): Promise<IPData> {
  const result = await fetch(
    'http://ip-api.com/json?fields=status,message,country,regionName,city,lat,lon,timezone,query'
  );
  return (await result.json()) as IPData;
}
