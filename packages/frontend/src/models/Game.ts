import Player from './Player';
import GameStatus from './GameStatus';
export default interface Game {
  id?: string;
  name: string;
  players?: Player[];
  moderator: Player;
  status: GameStatus;
}
