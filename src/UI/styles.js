import styled, { css } from "styled-components";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
// import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export const MenuContextContainer = styled.div`
  border: 1px solid #000000;
  // border-radius: 4px;
  padding: 18px;
  margin: 5px 0;
  box-sizing: border-box;
`;
export const ContextMenu = styled.div`
  position: absolute;
  z-index: 60;
  font-size: x-small;
  width: 150px;
  background-color: #ffffff;
  color: #000000;
  border: 1px #000000 solid;
  border-radius: 3px;
  box-sizing: border-box;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 0;
    margin: 1px;
    list-style: none;
  }
  ul li {
    padding: 3px 12px;
    margin: 0;
  }
  /* hover */
  ul li:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }

  hr {
    margin: 5px 0 !important;
    border-color: #000000;
  }
`;

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    border: "1px solid grey",
    color: "grey",
    fontSize: 8,
  },
}));

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#cccccc",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#cccccc",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#cccccc",
    borderRadius: 20 / 2,
  },
}));
