import { Inject, Service } from 'typedi';
import { JsonController, Get, QueryParams } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { NearByPartnersRequest, NearByPartnersResponse } from '../models';
import { PartnersService } from '../services';

@JsonController('/partners')
@Service()
export class PartnersController {
    @Inject()
    private partnersService: PartnersService;

    @Get('/nearby')
    @ResponseSchema(NearByPartnersResponse)
    public nearByPartnerts(@QueryParams() params: NearByPartnersRequest): NearByPartnersResponse {
        const data = this.partnersService.getNearbyPartners(params);
        return new NearByPartnersResponse(data);
    }
}
