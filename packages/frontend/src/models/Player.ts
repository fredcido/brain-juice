export default interface Player {
  id: string;
  name: string;
  avatar?: string,
  socket_id?: string,
  status?: string,
  game_id?: string,
  joined: Date;
}