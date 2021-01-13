import { $ } from "@/core/Dom";

export function shouldResize(event) {
  return Boolean(event.target.dataset.resize);
}

export function handleResize(event, $root) {
  return new Promise((res) => {
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

      res({
        value: type === "col" ? colWidth : coords.height + rowHeight,
        id: type === "col" ? $parent.data.col : $parent.data.row - 1,
        type,
      });

      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}
