import React from 'react';
import {
    ListItem,
    ListItemText,
    List,
    ListItemAvatar,
    Avatar,
    ListSubheader
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Player from '../../models/Player';

interface PlayerListProps {    
    players: Player[],
    currentPlayer?: string,
    gameName?: string,
    isLoading?: boolean
};

const PlayersList = (props: PlayerListProps) => {
    const { gameName, players, isLoading, currentPlayer } = props;

    const amIThisPayer = (playerId: string) => {
        return playerId === currentPlayer;
    }

    const sortByMe = (players: Player[]) => {
        const sortIt = (a: Player, b: Player) => {
            if (a.id === currentPlayer) {
                return -1;
            }

            if (b.id === currentPlayer) {
                return 1;
            }

            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            } else if (nameA < nameB) {
                comparison = -1;
            }
            return comparison;
        };

        return players.sort(sortIt);
    }

    return <List component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                {isLoading ? <Skeleton variant="text" /> : <span>Game: {gameName}</span>}
            </ListSubheader>
        }>
        {sortByMe(players).map(player => (
            <React.Fragment key={player.id}>
                <ListItem button disabled={amIThisPayer(player.id)}>
                    <ListItemAvatar>
                        <Avatar>{player.name.charAt(0).toUpperCase()}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={player.name} secondary={player.status} />
                </ListItem>
            </React.Fragment>
        ))}
    </List>
}

export default PlayersList;