import { CommonUtils } from '../../../src/utils';

describe('Common Utils Class', () => {
    describe('toRadians method', () => {
        it('Should return in radians', () => {
            const value = CommonUtils.toRadians(10)
            const actualValue = 0.17453292519943295;
            expect(value).toBe(actualValue);
        })

        it('Should return in radians', () => {
            const value = CommonUtils.toRadians(10)
            const actualValue = 0;
            const matched = value === actualValue;
            expect(matched).toBeFalsy();
        })
    });

    describe('paginate method', () => {
        it('Should return paginated object as return', () => {
            const data = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
            const paginated = CommonUtils.paginate(data, 1, 1)
            expect(paginated.length).toBe(1)
            expect(paginated[0].a).toBe(2)
        })
    })

    describe('findDistance method', () => {
        it('Should return the distance between 2 coordinates in kilometers', () => {
            const distance = CommonUtils.findDistance(0, 0, 1, 1)
            const actualDistance = 157.42553710839354;
            expect(distance).toBe(actualDistance)
        })
    })

});
