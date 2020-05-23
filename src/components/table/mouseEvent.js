import { $ } from "../../core/Dom";

export function setOnMouseEvents(event, $root) {
  if (event.target.dataset.resize) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const arr = $root.findAll(`[data-col="${$parent.data.col}"]`);
    const type = $resizer.data.resize;
    let colWidth;
    let rowHeight;
    document.onmousemove = (e) => {
      if (type === "col") {
        const delta = e.pageX - coords.right;
        colWidth = coords.width + delta;
        $resizer.css({
          right: -delta + "px",
        });
      } else if (type === "row") {
        rowHeight = e.pageY - coords.bottom;
        $resizer.css({
          bottom: -rowHeight + "px",
        });
      }
    };

    document.onmouseup = () => {
      if (type === "col") {
        $parent.css({
          width: colWidth + "px",
        });
        arr.forEach((item) => {
          item.style.width = colWidth + "px";
        });
        $resizer.css({
          right: 0 + "px",
        });
      } else if (type === "row") {
        $parent.css({
          height: coords.height + rowHeight + "px",
        });
        $resizer.css({
          bottom: 0 + "px",
        });
      }
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
}
