import Game from "./Game";
import Player from './Player';

export default interface GlobalState {
  game?: Game;
  players?: Player[];
};