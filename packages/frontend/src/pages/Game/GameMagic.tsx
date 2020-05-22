import React, { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Game from '../../models/Game';
import Player from '../../models/Player';
import SpinningWheel from '../../components/SpinnngWheel';
import { Typography, Avatar } from "@material-ui/core";

interface GameMagicProps {
  players: Player[];
  game: Game;
}

const options = [
  'MERGE IT',
  'BOOST IT',
  'MUTATE',
  'DISRUPT'
];

const GameMagic: React.FC<GameMagicProps> = ({ players }) => {
  const [selectedItem, setSelectedItem] = useState(-1);
  const [loading, setLoading] = useState(false);
  const onSelectItem = (item: number) => setSelectedItem(item);
  const onLoading = (loading: boolean) => setLoading(loading);
  const drawUpdate = (...args: any) => console.log(args);

  const Title = (loading: boolean, selectedItem: number) => {
    return <Typography variant="h4">Item Selected: {options[selectedItem]}</Typography>
  }

  return (
    <div className="p-4 flex flex-col w-full h-screen">
      <div className="flex-grow flex items-center justify-between">
        <div className="flex flex-col items-center justify-between flex-grow">
          <Typography variant="h4" color="primary">
            {loading && <span>Loading...</span>}
            {selectedItem === -1 && !loading && <span>Click in wheel to start</span>}
            {selectedItem > -1 && <span>Item Selected: <b>{options[selectedItem]}</b></span>}
          </Typography>
          <br />
          <SpinningWheel items={options} onSelectItem={onSelectItem} onLoading={onLoading} />
        </div>
        <div className="">
          <ReactSketchCanvas
            width="700"
            height="500"
            strokeWidth={4}
            strokeColor="red"
            onUpdate={drawUpdate}
          />
        </div>
      </div>
      <div className="h-48 p-2 w-full">
        <ul className="flex justify-between">
          {players.map(player => (
            <li className="flex flex-col items-center justify-between h-20" key={player.id}>              
              <Avatar alt={player.name}>{player.name.charAt(0).toUpperCase()}</Avatar>
              <span>{player.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GameMagic;