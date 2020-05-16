import api from '../helpers/api';
import Game from '../models/Game';

const ENDPOINT = '/games';

const add =  (game: Game) => api.post(ENDPOINT, game).then(res => res.data);
const get = (id: string) => api.get(`${ENDPOINT}/${id}`).then(res => res.data);
const edit = (id: string, game: Game) => api.put(`${ENDPOINT}/${id}`, game).then(res => res.data);

export {
  add,
  get,
  edit
}