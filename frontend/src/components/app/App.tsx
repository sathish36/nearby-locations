import { message, Pagination } from 'antd';
import React, { useState } from 'react';
import { getNearbyPartners } from '../../services/partners.service';
import { PartnerType } from '../../types';
import ListPartners from '../partners/list-partners';
import SearchForm from '../search-form/search-form';

import './App.scss';

export default function App() {


  // hardcoding sortKey and sortOrder at the moment as we have only 1 key
  const sortKey =  'organization';
  const sortOrder =  'asc';
  const pagination = {
    limit: 10,
    offset: 0,
  };

  const [partners, setPartners] = useState<PartnerType[]>([])
  const [noPartnersFound, setNoPartnersFound] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  // inputs will container, radius, long, lat selected by user
  const [inputs, setInputs] = useState<[number, number, number]>([0, 0,0]);
  const [totalPartners, setTotalPartners] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  async function searchPartners (radius:number, long:number, lat:number, offset:number) {
    console.log(radius)
      if(radius <= 0){
        message.warning('Please enter radius greater than 0');
        return;
      }
      // store radius, lat & long, so that while changing the pagination we can use this value
      setInputs([radius, long, lat])
      

      // set loading true to show message in the UI
      setLoading(true)
      setNoPartnersFound(false)
      // always calculate current page number, this is used in pagination component
      setCurrentPage(offset/pagination.limit +1)

      const {partners:data, total} = await getNearbyPartners({lat,limit:pagination.limit,long, offset, radius, sortKey, sortOrder});
      
      setTotalPartners(total)
      // set noParterners to true if we didn't find anyone in given radius
      if(!total)setNoPartnersFound(true)

      setLoading(false)
      setPartners(data)
  }
  const resetPartners = () =>{
    setPartners([])
    setInputs([0, 0,0])
    setTotalPartners(0)
  }
  const onPageChange = (page:number)=>{
    const offset = (page -1) * pagination.limit;
    searchPartners(inputs[0], inputs[1], inputs[2], offset)
  }

    return (
        <div className="App">
          <h1>{'Search Partners!'}</h1>

        <SearchForm searchPartners={searchPartners} reset={resetPartners}></SearchForm>
        <ListPartners partners={partners}></ListPartners>
        {
                !!totalPartners && 
                    <Pagination
                    className="pagination"
                    total={totalPartners}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
                    defaultPageSize={pagination.limit}
                    defaultCurrent={1}
                    current={currentPage}
                    onChange={onPageChange}
                    responsive={true}
                    />
                
            }
            {
              noPartnersFound && <div className="no-partners">No partners found in {inputs[0]} km radius.</div>
            }
             {
              loading && <div className="loading">Loading partners...</div>
            }
        </div>
    );
}
