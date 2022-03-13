import { Inject, Service } from 'typedi';
import { JsonController, Get, QueryParams } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { NearByPartnersRequest, NearByPartnersResponse } from '@app/models';
import { PartnersService } from '@app/services';

@JsonController('/partners')
@Service()
export class PartnersController {
    @Inject()
    private partnersService: PartnersService;

    @Get('/nearby')
    @ResponseSchema(NearByPartnersResponse)
    public async nearByPartnerts(@QueryParams() params: NearByPartnersRequest): Promise<NearByPartnersResponse> {
        const data = await this.partnersService.getNearbyPartners(params);
        return new NearByPartnersResponse(data);
    }
}
