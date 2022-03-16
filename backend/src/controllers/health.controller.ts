import { JsonController, Get } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { HealthStatusResponse } from '../models';

@JsonController('/health')
export class HealthController {
    @Get('/status')
    @ResponseSchema(HealthStatusResponse)
    public async status(): Promise<HealthStatusResponse> {
        // if we have database we can check connectivity and send response here.
        return new HealthStatusResponse('Health Status OK', true);
    }
}
