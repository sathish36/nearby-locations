import { Service } from 'typedi';

import { NearByPartnersRequest } from '../models';
import { NearByPartnersType, OfficeType, PartnerType } from '../types';
import { CommonUtils } from '../utils';

/* 

    for this data, alternatively we can store this in sql table, 
    2 tables, 1 for organizations and other for offices, querying on offices
    with spatial column will give the result in faster way with paginated data
*/

const partnersData: PartnerType[] = require('../data/partners.js');

@Service()
export class PartnersService {
    public getNearbyPartners(params: NearByPartnersRequest): NearByPartnersType {
        const { limit, offset, long, lat, radius } = params;
        let { sortKey, sortOrder } = params;

        let nearbyPartners: PartnerType[] = [];
        partnersData.forEach((p) => {
            const nearByOffices: OfficeType[] = [];
            p.offices.forEach((o) => {
                // split the string with comma (,) and do parsing with parseFloat as long and lat will have decimal points
                const [officeLong, officeLat] = o.coordinates.split(',');

                const distance = CommonUtils.findDistance(long, lat, parseFloat(officeLong), parseFloat(officeLat));
                if (distance <= radius) {
                    nearByOffices.push(o);
                }
            });
            if (nearByOffices.length) {
                nearbyPartners.push({
                    id: p.id,
                    organization: p.organization,
                    offices: nearByOffices,
                });
            }
        });
        const totalFound = nearbyPartners.length;
        if (nearbyPartners.length) {
            // sort the data by sortKey in sortOrder
            let sortBy = 'organization';

            // if the sortKey is coming from api then use it.
            if (sortKey) {
                sortBy = sortKey;
            }

            // sort the data by given sortKey and sortOrder
            nearbyPartners = CommonUtils.sort(nearbyPartners, sortBy, sortOrder);

            // paginate the data
            nearbyPartners = CommonUtils.paginate(nearbyPartners, offset, limit);
        }

        return {
            data: nearbyPartners,
            limit,
            offset,
            total:totalFound
        };
    }
}
