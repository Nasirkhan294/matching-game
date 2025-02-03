document.addEventListener("DOMContentLoaded", function () {
    const draggableItems = document.querySelectorAll(".puzzle-piece.right");
    const dropZones = document.querySelectorAll(".puzzle-piece.left");

    draggableItems.forEach(item => {
        item.addEventListener("dragstart", (event) => {
            // Store the ID of the dragged item
            console.log("Drag started:", event.target.id);
            event.dataTransfer.setData("text", event.target.id);
        });
    });

    dropZones.forEach(zone => {
        // Allow the zone to accept the dragged item
        zone.addEventListener("dragover", (event) => {
            event.preventDefault();
            console.log("Drag over zone:", zone);
        });

        // Handle the drop action
        zone.addEventListener("drop", (event) => {
            event.preventDefault();
            const draggedItemId = event.dataTransfer.getData("text");
            const draggedItem = document.getElementById(draggedItemId);

            // Ensure the item is being dropped in a valid zone
            if (draggedItem && zone.querySelector('img')) {
                // Append the dragged item to the drop zone
                zone.appendChild(draggedItem);
                draggedItem.setAttribute("draggable", "false");
                draggedItem.classList.add("dropped");

                console.log("Dropped item:", draggedItemId);
            }
        });
    });
});
