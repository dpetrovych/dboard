import { getPublicIPData as getIP1 } from '../services/ipapi.co';
import { getPublicIPData as getIP2 } from '../services/ipapi.com';

export interface IPData {
  ip: string;
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
}

export async function getPublicIPData(): Promise<IPData> {
  try {
    const {
      ip,
      latitude,
      longitude,
      city,
      region,
      country_name,
    } = await getIP1();
    return {
      ip,
      latitude,
      longitude,
      city,
      region,
      country: country_name,
    };
  } catch (e) {
    const { query, lat, lon, city, regionName, country } = await getIP2();
    return {
      ip: query,
      latitude: lat,
      longitude: lon,
      city,
      region: regionName,
      country,
    };
  }
}
