import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="flex items-center justify-center w-[25rem] h-[25rem]">
      <div>
        <h1 className="text-[3rem] font-bold">♣ GUDI ♠</h1>
        <Link to={"start"}>
          <button className="bg-red-500 w-[100%] text-xl font-semibold py-5 rounded-lg">
            Start Game
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
