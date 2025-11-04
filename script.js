document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-overview-card');
    const dialog = document.getElementById('product-details-dialog');

    // Helper function to extract numbers from text
    const extractNumber = (text) => {
        const match = text.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    // Helper function to calculate and update stock bar
    const updateStockBar = (stockBar, currentStock, reorderAt) => {
        const stockPercentage = Math.min((currentStock / reorderAt) * 100, 100);
        stockBar.style.width = `${stockPercentage}%`;
        
        // Update color based on stock level
        if (currentStock <= reorderAt) {
            stockBar.style.backgroundColor = '#ff4d4d'; // Red for low stock
        } else if (currentStock <= reorderAt * 1.5) {
            stockBar.style.backgroundColor = '#ffd700'; // Yellow for moderate stock
        } else {
            stockBar.style.backgroundColor = '#4CAF50'; // Green for good stock
        }
    };

    // Helper function to update dialog content
    const updateDialog = (card) => {
        // Get product data from the card
        const name = card.querySelector('.overview-prod-name').textContent;
        const id = card.querySelector('.overview-prod-id').textContent;
        const profit = card.querySelector('.overview-profit span').textContent;
        const stockCount = card.querySelector('.stock-labels span').textContent;
        const reorderLevel = card.querySelector('.stock-labels p:last-child').textContent;
        const profitIcon = card.querySelector('.overview-bull-icon svg').cloneNode(true);
        // const category = card.querySelector('.overview-prod-category p').textContent;

        // Update dialog title to include category
        dialog.querySelector('.dialog-title').textContent = `Product Details`;

        // Populate dialog with product data
        dialog.querySelector('.product-name').textContent = name;
        dialog.querySelector('.product-id').textContent = id;
        dialog.querySelector('.profit-amount').textContent = `${profit} profit`;
        dialog.querySelector('.profit-icon').innerHTML = '';
        dialog.querySelector('.profit-icon').appendChild(profitIcon);
        dialog.querySelector('.stock-count').textContent = `${stockCount} in stock`;
        dialog.querySelector('.reorder-level').textContent = reorderLevel;

        // Update stock bar
        const stockBar = dialog.querySelector('.stock-bar');
        const currentStock = extractNumber(stockCount);
        const reorderAt = extractNumber(reorderLevel);
        updateStockBar(stockBar, currentStock, reorderAt);
    };

    // Add click event listener to each product card
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            updateDialog(card);
            dialog.showModal();
        });

        // Update stock bars in cards on load
        const stockBar = card.querySelector('.stock-level__bar');
        const currentStock = extractNumber(card.querySelector('.stock-labels span').textContent);
        const reorderAt = extractNumber(card.querySelector('.stock-labels p:last-child').textContent);
        updateStockBar(stockBar, currentStock, reorderAt);
    });
});