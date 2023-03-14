import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null; //Early return

  return (
    <div className="p-5 shadow-lg">
      <ul>
        <Link to={"/"}>
          <li className="py-3 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
            Home
          </li>
        </Link>
        <li className="py-3 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          Shorts
        </li>
        <li className="py-3 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          Subscriptions
        </li>
        <hr className="py-3" />

        <li className="py-3 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          Library
        </li>
        <li className="py-3 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          History
        </li>
        <li className="py-3 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          Your videos
        </li>
        <li className="py-3 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          Watch later
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
