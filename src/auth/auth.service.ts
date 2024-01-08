import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(private jwtTokenService: JwtService){}

    async validateUserCredentials(clientId: string, clientSecret: string, grantType: string): Promise<any> {
            

        if (jwtConstants.client_id ===  clientId && jwtConstants.client_secret === clientSecret && jwtConstants.grant_type === grantType) {
            const result = clientId;
            return result;
        }
        return null;
    }

    async loginWithCredentials(request: any) {
        const payload = { client_secret: request.client_secret, client_id: request.client_id };

        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }
}
