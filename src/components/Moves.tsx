import { PokemonInterface } from "../interfaces";

export interface MovesProps {
  pkmnData: PokemonInterface;
}

const Moves: React.FC<MovesProps> = (props) => {
  return (
    <div className="moves ">
      <h2
        className="text-4xl uppercase text-black"
        style={{ backgroundColor: "#365aa8" }}
      >
        moves
      </h2>
      <ul
        className="overflow-y-scroll h-64 list-disc list-inside pl-1"
        style={{ backgroundColor: "#ffcc01" }}
      >
        {props.pkmnData.moves
          .filter(
            (move: any) => move.version_group_details[0].level_learned_at !== 0
          )
          .map((move: any, index: number) => {
            // if (index > 5) return;
            return (
              <li key={move.move.name}>
                <a
                  href={`/move/${move.move.name}`}
                  key={move.move.name}
                  className="capitalize"
                >
                  {move.move.name.replaceAll("-", " ")}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Moves;
