export interface TypesProps {
  types: any[];
}
const Types: React.FC<TypesProps> = ({ types }) => {
  return (
    <span className="flex justify-around h-full">
      {types.map((i) => {
        return (
          <a href={`/type/${i.type.name}`} key={i.type.name}>
            <img
              className="type-img "
              src={`/assets/Icon_${i.type.name}.png`}
              alt={i.type.name}
            />
          </a>
        );
      })}
    </span>
  );
};

export default Types;
