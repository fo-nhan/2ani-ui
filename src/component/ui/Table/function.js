export const moveTable = (element) => {
  try {
    // Get the table and its rows
    var table = element;
    var rows = table.rows;
    var dragSrcEl = null;
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      row.draggable = true;

      row.addEventListener("dragstart", function (e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", this.outerHTML);
      });

      row.addEventListener("dragend", function (e) {
        table.querySelectorAll(".border-t-2").forEach(function (el) {
          el.classList.remove("border-t-2");
        });
      });

      row.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.classList.add("border-t-2");
      });

      row.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.classList.add("border-t-2");
      });

      row.addEventListener("dragleave", function (e) {
        this.classList.remove("border-t-2");
      });
      row.addEventListener("drop", function (e) {
        e.preventDefault();
        if (dragSrcEl != this) {
          table.tBodies[0]?.insertBefore(dragSrcEl, this.nextSibling);
        }
        table.querySelectorAll(".border-t-2").forEach(function (el) {
          el.classList.remove("border-t-2");
        });
      });
    }
  } catch (error) {}
};
