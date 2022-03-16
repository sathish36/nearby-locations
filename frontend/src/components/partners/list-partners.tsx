import React from 'react';

import { PartnerType } from '../../types';

import './list-partners.scss';

export default function ListPartners({ partners }: { partners: PartnerType[] }) {
    return (
        <div>
            {!!partners.length &&
                partners.map((p, index) => {
                    return (
                        <div className="organization">
                            <div className="org-name">
                                {index + 1}. {p.organization}
                            </div>
                            {p.offices.map((o, oIndex) => {
                                return (
                                    <div className="office">
                                        <span className="office-header">Office {oIndex + 1}</span>
                                        <div>
                                            <span className="label">location:</span>
                                            <span className="data">{o.location}</span>
                                        </div>
                                        <div>
                                            <span className="label">address:</span>
                                            <span className="data">{o.address}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
        </div>
    );
}
