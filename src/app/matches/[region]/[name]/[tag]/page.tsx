'use client'

import CenterLoader from "@/components/Loader/Loader";
import PlayerKDA from "@/components/PlayerKDA/PlayerKDA";
import { useGetMatchesQuery } from "@/redux/valorantApi";
import { IMatch } from "@/types/matches";
import { Box, Center, Divider, Flex, Text } from "@mantine/core";

type Props = {
  params: {
    region: string,
    name: string,
    tag: string,
  }
}

const Page = ({params: {region, name, tag}}: Props) => {
  console.log({region, name, tag});
  const { data, error, isLoading } = useGetMatchesQuery({ region, name, tag })
  console.log(data);
  
  const decodedName = decodeURIComponent(name);
  if (isLoading) return <CenterLoader />
  
  return <Flex direction="column" gap="xl">
    {data?.data?.map((match: IMatch, i: number ) => {

      // const isTeamWon = match.players.all_players.find(({name}) => name === decodedName).team === 'Blue' ? (match.teams.blue.has_won ? "won" : "loose") : (match.teams.red.has_won ? "won" : "loose")
      
      return <>
        {
          match.players.blue.length ? <Center key={i} >
            <Flex direction="column">
              <Box p="xs">
                <Flex justify="space-between">
                  <Text size="md">Map: {match.metadata.map}</Text>
                  <Text size="md">{match.metadata.game_start_patched}</Text>
                </Flex>
              </Box>
              <Divider/>
              <Flex>
                <Divider orientation="vertical" />
                <Flex direction="column" w={350}>
                  <Box p="xs" bg="blue.3">
                    <Flex justify="space-between">
                      <Text fw={700}>Blue team</Text>
                      <Text c={match.teams.blue.has_won ? "green" : "red"} fw={700}>{match.teams.blue.has_won ? "WON" : "LOOSE"}</Text>
                    </Flex>
                  </Box>
                  <Divider/>
                  {
                    match.players.blue.map((player, i) => <PlayerKDA player={player} key={i} decodedName={decodedName} blue />)
                  }
                </Flex>
                <Divider orientation="vertical" />
                <Flex direction="column" w={350}>
                  <Box p="xs" bg="red.3">
                    <Flex justify="space-between">
                      <Text fw={700}>Red team</Text>
                      <Text c={match.teams.red.has_won ? "green" : "red"} fw={700}>{match.teams.red.has_won ? "WON" : "LOOSE"}</Text>
                    </Flex>
                  </Box>
                  <Divider />
                  {
                    match.players.red.map((player, i) => <PlayerKDA player={player} key={i} decodedName={decodedName} />)
                  }
                </Flex>
                <Divider orientation="vertical" />
              </Flex>
              <Divider/>
            </Flex>
          </Center>
          : null
        }
      </>
    })}
  </Flex>
}

export default Page