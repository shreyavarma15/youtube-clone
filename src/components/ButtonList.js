import Button from "./Button";
import { BUTTON_LIST } from "../utils/constant";

const ButtonList = () => {
  return (
    <div className="flex">
      {BUTTON_LIST.map((button) => (
        <Button name={button} key={button} />
      ))}
    </div>
  );
};

export default ButtonList;
