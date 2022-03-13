import { IsIn, IsString } from 'class-validator';

export class HealthStatusResponse {
    @IsIn([true])
    status: boolean;

    @IsString()
    message: string;

    constructor(message: string, status: boolean) {
        this.message = message;
        this.status = status;
    }
}
