import React, { useState } from 'react';
import {
  ReactSketchCanvas,
  CanvasPath,
} from "react-sketch-canvas";
import {
  Typography,
  Grid,
  Card,
  CardContent
} from '@material-ui/core';
import Game from '../../models/Game';
import Player from '../../models/Player';
import SpinningWheel from '../../components/SpinnngWheel';
import PlayersList from '../../components/Player/PlayersList';

interface GameMagicProps {
  players: Player[];
  game: Game;
}

type CanvasRef = React.RefObject<ReactSketchCanvas>;

const options = [
  'MERGE IT',
  'BOOST IT',
  'MUTATE',
  'DISRUPT'
];

const GameMagic: React.FC<GameMagicProps> = ({ players }) => {
  const [selectedItem, setSelectedItem] = useState(-1);
  const canvasRef: CanvasRef = React.useRef<ReactSketchCanvas>(null);
  const [loading, setLoading] = useState(false);
  const [paths, setPaths] = React.useState<CanvasPath[]>([]);
  const onSelectItem = (item: number) => setSelectedItem(item);
  const onLoading = (loading: boolean) => setLoading(loading);
  const drawUpdate = (updatedPaths: CanvasPath[]) => {
    setPaths(updatedPaths);
  };

  return (
    <Grid container alignContent="center">
      <Grid item xs={2}>
        <PlayersList players={players} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" style={{width: '100%', textAlign: "center"}} color="primary">
          {loading && <span>Loading...</span>}
          {selectedItem === -1 && !loading && <span>Click in wheel to start</span>}
          {selectedItem > -1 && !loading && <span>Item Selected: <b>{options[selectedItem]}</b></span>}
        </Typography>
        <br />
        <SpinningWheel items={options} onSelectItem={onSelectItem} onLoading={onLoading} />
      </Grid>
      <Grid item xs={4}>
        <br />
        <Card>
          <CardContent>          
            <ReactSketchCanvas
              ref={canvasRef}
              width="300px"
              height="300px"
              strokeWidth={4}
              strokeColor="#000000"
              canvasColor="#FFFFFF"
              eraserWidth={5}
              allowOnlyPointerType="mouse"
              style={{ border: "none" }}
              onUpdate={drawUpdate}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default GameMagic;