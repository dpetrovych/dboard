export interface IPData {
  ip: string;
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country_name: string;
}

interface IPResponse extends IPData {
  error: boolean;
  message: string;
}

export async function getPublicIPData(): Promise<IPData> {
  const result = await fetch('https://ipapi.co/json');
  const response = (await result.json()) as IPResponse;
  if (response.error) throw Error(`[ipapi.com] ${response.message}`);
  return response;
}
