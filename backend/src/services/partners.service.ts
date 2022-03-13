import { Service } from 'typedi';

import { NearByPartnersRequest } from '@app/models';
import { NearByPartnersType, OfficeType, PartnerType } from '@app/types';
import { CommonUtils } from '@app/utils';

const partnersData: PartnerType[] = require('../data/partners.js');

@Service()
export class PartnersService {
    public async getNearbyPartners(params: NearByPartnersRequest): Promise<NearByPartnersType> {
        const { limit, offset, long, lat, nearBy } = params;
        let { sortKey, sortOrder } = params;

        let nearbyPartners: PartnerType[] = [];
        partnersData.forEach((p) => {
            const nearByOffices: OfficeType[] = [];
            p.offices.forEach((o) => {
                const [officeLong, officeLat] = o.coordinates.split(',');
                const distance = CommonUtils.findDistance(long, lat, parseFloat(officeLong), parseFloat(officeLat));
                if (distance <= nearBy) {
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
        };
    }
}
