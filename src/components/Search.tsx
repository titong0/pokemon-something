import { createRef, useEffect } from "react";
import Form from "./Form";
export interface FormProps {
  hide: () => void;
}

const Search: React.FC<FormProps> = (props) => {
  const ref: React.RefObject<HTMLDivElement> = createRef();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref && ref !== null) {
      const cur = ref.current;
      if (cur && !cur.contains(event.target as Node)) {
        props.hide();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className="absolute left-0 top-12 z-10" ref={ref}>
      <Form infoType="pokemon" color="yellow">
        Enter a pokemon name or ID
      </Form>
      <Form infoType="type" color="blue">
        Enter a type (english!)
      </Form>
    </div>
  );
};

export default Search;
