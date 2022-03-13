import { ONE_EIGHTY, PI, RADIUS_OF_EARTH } from '@app/constants';
import { SortOrder } from '@app/enums';

export class CommonUtils {
    /**
     * Returns the array of values
     *
     * @param Obj - It has multiple key - value pairs
     */
    public static getObjectValues<T>(obj: { [key: string]: T }): T[] {
        return Object.keys(obj).map((key) => obj[key]);
    }

    /**
     * converts degrees into radians
     *
     * @param degrees - input value in degrees
     *
     * @returns radians
     */
    private static toRadians(degrees: number): number {
        return degrees * (PI / ONE_EIGHTY);
    }

    /**
     *
     * returns the distance between two coordinates
     * @param fromLong
     * @param fromLat
     * @param toLong
     * @param toLat
     *
     * @returns distance in kilometers.
     */
    public static findDistance(fromLong: number, fromLat: number, toLong: number, toLat: number): number {
        if (fromLong === toLong && fromLat === toLat) return 0;

        // converting the degrees to radians
        const fromLatRadins = CommonUtils.toRadians(fromLat);
        const toLatRadians = CommonUtils.toRadians(toLat);

        const theta = fromLong - toLong;
        const thetaRadians = CommonUtils.toRadians(theta);

        const angle = Math.acos(
            Math.sin(fromLatRadins) * Math.sin(toLatRadians) +
                Math.cos(fromLatRadins) * Math.cos(toLatRadians) * Math.cos(thetaRadians),
        );

        // dividing by 1000 to return the value in Kilometers.
        return (RADIUS_OF_EARTH * angle) / 1000;
    }

    /**
     * paginates the data based on given inputs.
     *
     * @param data - Data array to be paginated
     * @param offset - number of items to be skipped
     * @param limit - number of items to be considered
     *
     * @returns paginated data
     */
    public static paginate<T>(data: T[], offset: number, limit: number): T[] {
        return data.slice(offset, offset + limit);
    }

    /**
     * sorts the data by given sortKey in given sort order
     * @param data  - array of objects to be sorted
     * @param sortKey - sort key on which sorting happens
     * @param sortOrder - sorting order, if not provided then by default sorts in ascending order
     *
     * @returns sorted data
     */
    public static sort<T>(data: T[], sortKey: string, sortOrder: SortOrder = SortOrder.asc): T[] {
        return data.sort(function (a, b): number {
            const result = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
            return result * (sortOrder === SortOrder.asc ? 1 : -1);
        });
    }
}
