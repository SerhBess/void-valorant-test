'use client'

import { useGetLeaderboardQuery } from '@/redux/valorantApi';
import RegionTabs from '@/components/Tabs/RegionTabs';
import { useEffect, useState } from 'react';
import Leaderboard from '@/components/Leaderboard/Leaderboard';
import CenterLoader from '@/components/Loader/Loader';

export default function Home() {

  const [currentRegion, setCurrentRegion] = useState('eu')

  const [isMyFetching,setIsFetchingDown]=useState(false)
  const [isMyFetchingUp,setIsMyFetchingUp]=useState(false)
  const [currentPostStart,setCurrentPostStart]=useState(0)
  
  const { data, error, isLoading } = useGetLeaderboardQuery({ start: currentPostStart, region: currentRegion })
  console.log({ data });

  const scrollHandler=(e:any):void=>{
    if(e.target.documentElement.scrollTop<50)
    {
        setIsMyFetchingUp(true)
    }
    if(e.target.documentElement.scrollHeight-e.target.documentElement.scrollTop-window.innerHeight<50)
    {
        setIsFetchingDown(true)
        window.scrollTo(0,(e.target.documentElement.scrollHeight + e.target.documentElement.scrollTop));
    }
  }

  useEffect(()=>{
    document.addEventListener('scroll',scrollHandler)
    return ()=>{
      document.removeEventListener('scroll',scrollHandler)
    }
  }, [])
  
  useEffect(() => {
    if (isMyFetching) {
      setCurrentPostStart((prev) => {
        const nextStart = prev + 1000;
        return nextStart <= 15000 ? nextStart : prev; 
      });
      setIsFetchingDown(false);
    }
  }, [isMyFetching]);

  useEffect(() => {
    if (isMyFetchingUp) {
      setCurrentPostStart((prev) => {
        const nextStart = prev - 1000;
        return nextStart >= 0 ? nextStart : prev; 
      });
      setIsMyFetchingUp(false);
    }
  }, [isMyFetchingUp]);
  
  return <>
    <RegionTabs setCurrentRegion={setCurrentRegion} />
    {isLoading ? <CenterLoader /> : <Leaderboard players={data.players} />}
  </>
}
