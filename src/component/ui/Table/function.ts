export const moveTable = (element: HTMLTableElement) => {
  try {
    // Get the table and its rows
    const table: HTMLTableElement = element;
    const rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
    let dragSrcEl: HTMLTableRowElement | null = null;

    for (let i = 1; i < rows.length; i++) {
      const row: HTMLTableRowElement = rows[i];
      row.draggable = true;

      row.addEventListener("dragstart", function (e: DragEvent) {
        dragSrcEl = this;
        e.dataTransfer!.effectAllowed = "move";
        e.dataTransfer!.setData("text/html", this.outerHTML);
      });

      row.addEventListener("dragend", function () {
        table.querySelectorAll(".border-t-2").forEach((el) => {
          el.classList.remove("border-t-2");
        });
      });

      row.addEventListener("dragover", function (e: DragEvent) {
        e.preventDefault();
        this.classList.add("border-t-2");
      });

      row.addEventListener("dragenter", function (e: DragEvent) {
        e.preventDefault();
        this.classList.add("border-t-2");
      });

      row.addEventListener("dragleave", function () {
        this.classList.remove("border-t-2");
      });

      row.addEventListener("drop", function (e: DragEvent) {
        e.preventDefault();
        if (dragSrcEl !== this) {
          table.tBodies[0]?.insertBefore(dragSrcEl!, this.nextSibling);
        }
        table.querySelectorAll(".border-t-2").forEach((el) => {
          el.classList.remove("border-t-2");
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};
