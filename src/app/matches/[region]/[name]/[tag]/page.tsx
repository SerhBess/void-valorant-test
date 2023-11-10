'use client'

import { useGetMatchesQuery } from "@/redux/valorantApi";

type Params = {
  params: {
    region: string,
    name: string,
    tag: string,
  }
}

const Page = ({params: {region, name, tag}}: Params) => {
  console.log({region, name, tag});
  const { data, error, isLoading } = useGetMatchesQuery({region, name, tag})
  console.log({data});
  
  return <h1>Matches Page</h1>
}

export default Page