import React from 'react'
import { Button } from '@material-ui/core';

interface GamesRulesProps {
  onUnderstandTheRule: () => void;
}

const GameRules: React.FC<GamesRulesProps> = ({ onUnderstandTheRule }) => {
  return (
    <div>
      <h1 className="text-5xl mb-4">Game Play</h1>

      <div className="space-y-4">
        <p>The objective of this game is to practice the behaviors and thinking of the empathize and ideate phases of design thinking.</p>
        <p>The purpose is to have game players brainstorm innovative ideas by looking at objects in different perspectives and thinking beyond the obvious.</p>
        <p>The game is based on the concept of disruptive thinking to look at an object and coming up with an entirely different way to achieve the same end.</p>
        <p>This game encourage wild ideas and players are voting on eachothers ideas on usability and creativity</p>
      </div>

      <div className="my-4">
        <h2 className="text-4xl">There are 4 steps in this game:</h2>

        <ol>
          <li>
            In this step the spinning wheel is turned that features four different ways on approaching innovation:
            <ol>
              <li>
                <span>Boost it 	-	In this case one card will be drawn from the deck.</span>
                Players are to add or change one or more elements depicted on the card to improve the ojbect or idea.
                Players can draw the improvement and describe it in 250 characters
              </li>
              <li>
                Mutate	-	In this case one card will be drawn from the deck.
                Players are to use the object on the card for a different purpose
                Players can draw the new purpose and describe it in 250 characters
              </li>
              <li>
                Merge it	- 	In this case two cards will be drawn from the deck.
                Players are to pick items or parts from each picture and create a new object.
                Players can draw the new object and describe it in 250 characters
              </li>
              <li>
                Disrupt	-	In this case one card will be drawn from the deck.
                Players are to come up with a completely different way (object) to achieve the same purpose of the object.
                Players can draw the new object and describe it in 250 characters
              </li>
            </ol>
          </li>
          <li>
            In this step the card(s) are drawn from the deck and displayed
          </li>
          <li>
            The players have 5 minutes to draw and type their solutions
          </li>
          <li>
            After all players submitted their solutions, it is voting time. There are 2 votes that can be casted
            <ol>
              <li>
                Most usable solution
              </li>
              <li>
                Most crazy / funky out of the box solution
              </li>
            </ol>
          </li>
        </ol>

        <p>In total their are 3 round and after each voting round the leaderboard is shown ranked based on Most Usable Solution votes received.</p>

        <p>After the final round the players their names are shown scattered and the player with most "Most usable solution" votes is highlighted (bigger font)
        and the player with the "most crazy / funky out of the box solution" votes is highlighted (bigger font)</p>

        <p className="mt-5 w-1/3 m-auto">
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onUnderstandTheRule}
          >
            I understand the rules
          </Button>
        </p>
      </div>
    </div>
  )
}

export default GameRules;
