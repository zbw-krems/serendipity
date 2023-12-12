import React, { forwardRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavDropdown } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import Dropdown from "react-bootstrap/Dropdown";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <MoreVertIcon color={"black"} fontSize={"small"} />

    {/* &#x25bc; */}
  </a>
));

const DropdownComponent = ({ dropdownItems, dropDownKey }) => {
  // should be in the following structure
  // [{title: string, command: fn, parameters: Array, subitems: Array}, {title: string, command: fn, parameters: Array}, {title: null}, {title: string, command: fn, parameters: Array}]
  dropDownKey = `${dropDownKey}-` + crypto.randomUUID();
  return (
    <div key={`DropDownWrapper-${dropDownKey}`}>
      <Dropdown key={`DropDown-${dropDownKey}`}>
        <Dropdown.Toggle
          key={`DropDownToggle-${dropDownKey}`}
          as={CustomToggle}
          id="dropdown-basic"
        ></Dropdown.Toggle>

        <Dropdown.Menu
          className="dropdownSmall position-absolute"
          key={`DropDownMenu-${dropDownKey}`}
        >
          {dropdownItems.map((item, index) => {
            return (
              <div key={`DropDownItemWrapperPepper-${index}-${dropDownKey}`}>
                {item.title ? (
                  <div key={`DropDownItemWrapper-${dropDownKey}-${index}`}>
                    {item.subitems ? (
                      <DropdownSubmenu
                        alignRight
                        title={item.title}
                        key={`DropdownSubmenu-${dropDownKey}-${index}-${item.title}`}
                      >
                        {item.subitems.map((subitem, index2) => (
                          <NavDropdown.Item
                            key={`NavDropdownItem-${dropDownKey}-${index2}-${subitem.title}`}
                            href="#"
                            className="dropdownSmall"
                            onClick={() => {
                              subitem.command(...subitem.parameters);
                            }}
                          >
                            {subitem.title}
                          </NavDropdown.Item>
                        ))}
                      </DropdownSubmenu>
                    ) : (
                      <Dropdown.Item
                        key={`DropdownItem-${dropDownKey}-${index}-${item.title}`}
                        onClick={() => {
                          item.command(...item.parameters);
                        }}
                      >
                        {/* <DeleteIcon fontSize={"smaller"} /> */}
                        {item.title}
                      </Dropdown.Item>
                    )}
                  </div>
                ) : (
                  <hr className="mx-0 my-1" />
                )}
              </div>
            );
          })}

          {/* */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownComponent;
