import { URLS } from "../constants/urls.constants"
import { PartnerType } from "../types";
import { axiosInstance } from "../utils/axios"

type NearByPartnerInputs = { long: number, lat: number, radius: number, offset: number, limit: number, sortKey: string, sortOrder: string }
export async function getNearbyPartners(params: NearByPartnerInputs): Promise<{ total: number, partners: PartnerType[] }> {
    try {

        const { data } = await axiosInstance.get<{ offset: number, total: number, limit: number, data: PartnerType[] }>(URLS.getNearByPartners, { params })
        const { total, data: partners } = data;
        return { partners, total }
    } catch (err) {
        // show a toaster message 
        return { partners: [], total: 0 }
    }
}