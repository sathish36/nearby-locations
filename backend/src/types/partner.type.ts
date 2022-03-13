import { OfficeType } from './office.type';

export type PartnerType = {
    id: number;
    organization: string;
    offices: OfficeType[];
};
