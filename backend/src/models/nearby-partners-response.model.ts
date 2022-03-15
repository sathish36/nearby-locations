import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, Max, Min } from 'class-validator';

import { NearByPartnersType, OfficeType, PartnerType } from '@app/types';

class OfficeModel {
    @IsString()
    location: string;

    @IsString()
    address: string;

    constructor({ address, location }: OfficeType) {
        this.location = location;
        this.address = address;
    }
}

class PartnerDetailsModel {
    @IsNumber()
    id: number;

    @IsString()
    organization: string;

    @IsArray()
    @Type(() => OfficeModel)
    offices: OfficeModel[];

    constructor({ id, organization, offices }: PartnerType) {
        this.id = id;
        this.organization = organization;
        this.offices = offices.map((o) => new OfficeModel(o));
    }
}

export class NearByPartnersResponse {
    @IsArray()
    @Type(() => PartnerDetailsModel)
    data: PartnerDetailsModel[];

    @IsNumber()
    @Min(0)
    offset: number;

    @IsNumber()
    @Min(0)
    total: number;

    @IsNumber()
    @Min(1)
    @Max(50)
    limit: number;

    constructor({ data, offset, limit, total }: NearByPartnersType) {
        this.offset = offset;
        this.limit = limit;
        this.total = total;
        this.data = data.map((p) => new PartnerDetailsModel(p));
    }
}
