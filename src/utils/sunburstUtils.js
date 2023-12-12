import { faucetColors } from "./config.js";
import * as colorConvert from "color-convert";

export const buildTree = (arr) => {
  // console.log(arr);

  const zeroObject = {
    uid: 0,
    title: "zero object",
    parent: null,
    level: 0,
  };
  let newData = [zeroObject, ...arr];
  // console.log(newData);

  function recursiveHellOfFabi(flatArray, parent, level = 1) {
    // console.log(flatArray);
    let tree = [];
    flatArray.forEach((item) => {
      // console.log(item);
      if (item.parent == parent) {
        // console.log(item);
        let children = recursiveHellOfFabi(flatArray, item.uid, level + 1);
        if (children.length) {
          item.children = children;
        }
        for (let child of children) {
          child.value = 360 / children.length;
          // console.log(flatArray.find((item) => item.uid == parent));
          // child.color = flatArray.find((item) => item.uid == parent).color;
        }

        tree.push({
          uid: item.uid,
          title: item.title,
          children: children,
          description: item.description,
          level: level,
          url: item.url,
          related: item.related,
        });
        // console.log(tree);
      }
    });

    // console.log(tree);
    return tree;
  }

  const tree = recursiveHellOfFabi(newData, "0");
  const treeWithRoot = {
    uid: 0,
    title: "Back to Root",
    children: tree,
    color: "#ffffff",
  };

  for (let child of treeWithRoot.children) {
    switch (child.uid) {
      case 1:
        child.value = 90;
        child.color = faucetColors[1];
        break;
      case 23:
        child.value = 90;
        child.color = faucetColors[23];
        break;
      case 159:
        child.value = 90;
        child.color = faucetColors[159];
        break;
      case 166:
        child.value = 90;
        child.color = faucetColors[166];
        break;

      default:
        break;
    }
  }
  function darkenColor(hexColor, factor) {
    // Convert the hex color to RGB
    var rgbColor = colorConvert.hex.rgb(hexColor);

    // Convert RGB to HSL
    const hslColor = colorConvert.rgb.hsl(rgbColor);

    // Darken the color by reducing the lightness
    hslColor[2] = Math.max(0, hslColor[2] - factor * 100);

    // Convert HSL back to RGB
    rgbColor = colorConvert.hsl.rgb(hslColor);

    // Convert RGB back to hex
    const newHexColor = colorConvert.rgb.hex(rgbColor);

    return `#${newHexColor}`;
  }

  function darkenColorsRecursive(node, factor, parentColor) {
    // Darken the color of the current node using the parent's color
    node.color = darkenColor(parentColor, factor);

    // Recursively process the children
    for (const child of node.children) {
      darkenColorsRecursive(child, factor, node.color); // Pass the current node's color as the parentColor
    }
  }

  // Define the darkening factor (0.1 for a moderate darkening)
  const darkeningFactor = 0.1;

  // Start the recursion for each root node
  for (const root of treeWithRoot.children) {
    darkenColorsRecursive(root, darkeningFactor, root.color);
  }

  // darkenColorsRecursive(treeWithRoot.children, darkeningFactor);

  return treeWithRoot;
};
