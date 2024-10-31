const getPosition = (
  trigger: ClientRect,
  content: ClientRect,
  position: string,
  offsetY: number,
  offsetX: number,
): { top: number, left: number } => {
  const pos = position.split(" ");

  const centerTop = trigger.top + trigger.height / 2;
  const centerLeft = trigger.left + trigger.width / 2;

  let top = centerTop - content.height / 2;
  let left = centerLeft - content.width / 2;

  switch (pos[0]) {
    case "top": {
      top -= content.height / 2 + trigger.height / 2;
      break;
    }

    case "right": {
      left += content.width / 2 + trigger.width / 2;
      break;
    }

    case "bottom": {
      top += content.height / 2 + trigger.height / 2;
      break;
    }

    case "left": {
      left -= content.width / 2 + trigger.width / 2;
      break;
    }

    default:
      break;
  }

  switch (pos[1]) {
    case "top": {
      top = trigger.top;
      break;
    }

    case "right": {
      left = trigger.left - content.width + trigger.width;
      break;
    }

    case "bottom": {
      top = trigger.top - content.height + trigger.height;
      break;
    }

    case "left": {
      left = trigger.left;
      break;
    }

    default:
      break;
  }

  top = pos[0] === "top" ? top - offsetY : top + offsetY;
  left = pos[0] === "left" ? left - offsetX : left + offsetX;

  return { left, top };
};

export default getPosition;
