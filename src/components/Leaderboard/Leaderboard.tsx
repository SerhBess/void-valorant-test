'use client'

import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import classes from './Leaderboard.module.css';
import { Players } from '@/types/players';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {
  players: Players
}

const Leaderboard = ({ players }: Props) => {
  
  if (!players) return null
  const rows = players.map((player) => {
    const maxRankedRating = 1000;
    const positiveRating = (player.rankedRating / maxRankedRating) * 100;
    const negativeRating = ((maxRankedRating - player.rankedRating) / maxRankedRating) * 100;


    return (
      <Table.Tr key={player.gameName}>
        <Table.Td>{player.leaderboardRank}</Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            <Link href={`/matches/eu/${player.gameName}/${player.tagLine}`}>
              {player.gameName}
            </Link>
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {player.tagLine}
          </Anchor>
        </Table.Td>
        <Table.Td>{Intl.NumberFormat().format(player.numberOfWins)}</Table.Td>
        <Table.Td>{player.rankedRating}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              {positiveRating.toFixed(0)}%
            </Text>
            <Text fz="xs" c="red" fw={700}>
              {negativeRating.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={positiveRating}
              color="teal"
            />

            <Progress.Section
              className={classes.progressSection}
              value={negativeRating}
              color="red"
            />
          </Progress.Root>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Rank</Table.Th>
            <Table.Th>Game Name</Table.Th>
            <Table.Th>Tag Line</Table.Th>
            <Table.Th>Number Of Wins</Table.Th>
            <Table.Th>Ranked Rating</Table.Th>
            <Table.Th>Rating distribution</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default Leaderboard