import { PokemonInterface } from "../interfaces";

export interface MovesProps {
  pkmnData: PokemonInterface;
}

const Moves: React.FC<MovesProps> = (props) => {
  return (
    <div className="moves h-64 relative">
      <h2
        className="text-3xl uppercase text-black absolute top-0 right-0"
        style={{ backgroundColor: "#365aa8" }}
      >
        moves
      </h2>
      <div className="h-full overflow-y-scroll">
        <ul
          className=" list-disc list-inside pl-1"
          style={{ backgroundColor: "#ffcc01" }}
        >
          {props.pkmnData.moves
            .filter(
              (move: any) =>
                move.version_group_details[0].level_learned_at !== 0
            )
            .map((move: any, index: number) => {
              return (
                <li key={move.move.name} className="capitalize">
                  {move.move.name.replaceAll("-", " ")}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Moves;
