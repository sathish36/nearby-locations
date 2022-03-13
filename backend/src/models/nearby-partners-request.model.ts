import {
    IsEnum,
    IsIn,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

enum SortOrder {
    asc = 'asc',
    desc = 'desc',
}

export class NearByPartnersRequest {
    @IsNumber()
    @Min(0)
    nearBy: number;

    @IsLatitude()
    @IsNotEmpty()
    lat: number;

    @IsLongitude()
    @IsNotEmpty()
    long: number;

    @IsNumber()
    @Min(0)
    offset: number;

    @IsNumber()
    @Min(1)
    @Max(50)
    // do not allow more than 50 records in pagination, this may effect the performance of the API.
    limit: number;

    @IsString()
    // currently we are allowing only in 1 field. we can extend this based on the other keys also
    @IsIn(['organization'])
    @IsOptional()
    sortKey?: string;

    @IsString()
    @IsEnum(SortOrder)
    @IsOptional()
    sortOrder?: SortOrder;
}
