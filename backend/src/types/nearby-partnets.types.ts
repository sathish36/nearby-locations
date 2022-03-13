import { PartnerType } from './partner.type';

export type NearByPartnersType = {
    offset: number;
    limit: number;
    data: PartnerType[];
};
