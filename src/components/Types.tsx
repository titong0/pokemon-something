import { PokemonInterface } from "../interfaces";
import { typesImgs } from "../service";

export interface TypesProps {
  pkmnData: PokemonInterface;
}
const Types: React.FC<TypesProps> = ({ pkmnData }) => {
  return (
    <span className="flex row-start-2 col-start-1 mt-1 ">
      <a href={`/type/${pkmnData.types[0].type.name}`}>
        <img
        
          className="type-img"
          src={typesImgs[pkmnData.types[0].type.name.toUpperCase()]}
          alt={pkmnData.types[0].type.name}
        />
      </a>
      <a href={`/type/${pkmnData.types[1]?.type.name}`}>
        <img
          className="type-img"
          src={typesImgs[pkmnData.types[1]?.type.name.toUpperCase()]}
          alt={pkmnData.types[1]?.type.name}
        />
      </a>
    </span>
  );
};

export default Types;
