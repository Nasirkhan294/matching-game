// Get all draggable items
const draggableItems = document.querySelectorAll('.right-piece');

// Set up click event to activate dragging and update the "right" value
draggableItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Activate drag
        e.target.setAttribute('draggable', true);

        // Change the 'right' value to 27px when clicked
        e.target.style.right = '27rem';
    });

    item.addEventListener('dragstart', (e) => {
        // On drag start, we store the dragged element's id
        e.dataTransfer.setData('text', e.target.id);

        // Change the 'right' value when dragging starts
        e.target.style.right = '27rem';
    });
});

// Get all drop zones (left pieces)
const dropZones = document.querySelectorAll('.left-piece');

// Set up drag over event to allow drop
dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();  // Allow drop by preventing default behavior
    });

    // Set up drop event
    zone.addEventListener('drop', (e) => {
        e.preventDefault();

        // Get the dragged item id
        const draggedItemId = e.dataTransfer.getData('text');
        const draggedItem = document.getElementById(draggedItemId);

        // Check if the dragged item matches the drop zone
        if (draggedItem && zone.id === getMatchingZoneId(draggedItemId)) {
            zone.innerHTML = draggedItem.innerHTML;  // Replace zone content with the dragged item
            zone.classList.add('dropped');  // Add class to indicate item was dropped correctly
            draggedItem.setAttribute('draggable', 'false');  // Disable further dragging of the item
        } else {
            // If incorrect, you can add a "shake" effect or any other feedback here
            alert('Incorrect match. Try again!');
        }
    });
});

// Function to map the dragged item to its corresponding drop zone
function getMatchingZoneId(draggedItemId) {
    switch (draggedItemId) {
        case 'right-telescope':
            return 'telescope';
        case 'right-agency':
            return 'space-agency';
        case 'right-shuttle':
            return 'shuttle';
        default:
            return '';
    }
}
