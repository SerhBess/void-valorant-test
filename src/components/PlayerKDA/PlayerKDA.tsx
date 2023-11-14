import React from 'react'
import { Avatar, Box, Divider, Flex, Highlight, Text } from '@mantine/core'
import { IPlayer } from '@/types/matches'
import s from './PlayerKDA.module.css'

type Props = {
  player: IPlayer, 
  decodedName: string,
  key: number,
  blue?: boolean
}

const PlayerKDA = ({player, decodedName, key, blue}: Props) => (
    <Box p="xs" key={key} bg={blue ? "blue.1" : "red.1"} className={s.playesCard}>
      <Flex direction="column" > 
        <Flex
          gap="md"
          justify="space-between"
          align="flex-start"
        >
          <Flex gap="sm" align="center">
            <Avatar src={player.assets.agent.small} alt={player.character} />
            <Text size="md">{player.character}</Text>
          </Flex>
          <Flex gap="sm" align="center">
            <Text size="md">
              <Highlight highlight={decodedName}>
                {player.name}
              </Highlight>
            </Text>
            <Avatar src={player.assets.card.small} alt={player.name}  />
          </Flex>
        </Flex>
        <Divider label="KDA" labelPosition="center" />
        <Flex  mb='xs'  justify="space-around">
          <Text size="md">Kills: {player.stats.kills}</Text>
          <Text size="md">Deaths: {player.stats.deaths}</Text>
          <Text size="md">Assists: {player.stats.assists}</Text>
        </Flex>
      </Flex>
    </Box>
  )

export default PlayerKDA