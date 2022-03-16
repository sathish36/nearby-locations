import "reflect-metadata"

import Container from 'typedi';

import { PartnersService } from '../../../src/services/partners.service';
import { CommonUtils } from '../../../src/utils';


describe('PartnersService', () => {
    describe('getNearbyPartners method', ()=>{
        it('Should return the partners in 100 km radius', () => {
            const partnersService = Container.get(PartnersService);

            const spy1 = jest.spyOn(CommonUtils, 'findDistance')
            const spy2 = jest.spyOn(CommonUtils, 'sort')
            const spy3 = jest.spyOn(CommonUtils, 'paginate')
            const result = partnersService.getNearbyPartners({lat:-0.142571, long:51.5144636, limit:10, offset:0, radius:100});

            expect(result.data.length).toBe(2);
            // we have 21 offices in the data
            expect(spy1).toHaveBeenCalledTimes(21);
            expect(spy2).toHaveBeenCalledTimes(1);
            expect(spy3).toHaveBeenCalledTimes(1);
            spy1.mockRestore();
            spy2.mockRestore();
            spy3.mockRestore();
        });
    })

})