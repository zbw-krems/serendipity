import React from "react";
import useContextMenu from "../Hooks/UseContextMenu";
import { ContextMenu } from "../styles/styles";
import Menu from "./Menu";
const MenuContextHook = ({ data }) => {
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  return (
    <div>
      {data.map((item) => (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            console.log("Right Click", e.pageX, e.pageY);
          }}
        >
          <Menu key={item.id} title={item.title} />
        </div>
      ))}
      {clicked && (
        <ContextMenu top={points.y} left={points.x}>
          <ul>
            <li>Edit</li>
            <li>Copy</li>
            <li>Delete</li>
          </ul>
        </ContextMenu>
      )}
    </div>
  );
};
export default MenuContextHook;
