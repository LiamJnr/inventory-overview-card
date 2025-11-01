document.addEventListener('DOMContentLoaded', () => {
    const productCard = document.querySelector('.product-overview-card');
    const dialog = document.getElementById('product-details-dialog');

    productCard.addEventListener('click', () => {
        // Get product data from the card
        const name = productCard.querySelector('.overview-prod-name').textContent;
        const id = productCard.querySelector('.overview-prod-id').textContent;
        const profit = productCard.querySelector('.overview-profit span').textContent;
        const stockCount = productCard.querySelector('.stock-labels span').textContent;
        const reorderLevel = productCard.querySelector('.stock-labels p:last-child').textContent;
        const profitIcon = productCard.querySelector('.overview-bull-icon svg').cloneNode(true);

        // Populate dialog with data
        dialog.querySelector('.product-name').textContent = name;
        dialog.querySelector('.product-id').textContent = id;
        dialog.querySelector('.profit-amount').textContent = `${profit} profit`;
        dialog.querySelector('.profit-icon').innerHTML = '';
        dialog.querySelector('.profit-icon').appendChild(profitIcon);
        dialog.querySelector('.stock-count').textContent = `${stockCount} in stock`;
        dialog.querySelector('.reorder-level').textContent = reorderLevel;

        // Update stock bar
        const stockBar = dialog.querySelector('.stock-bar');
        const currentStock = parseInt(stockCount);
        const reorderAt = parseInt(reorderLevel.match(/\d+/)[0]);
        const stockPercentage = Math.min((currentStock / reorderAt) * 100, 100);
        stockBar.style.width = `${stockPercentage}%`;
        
        // Show the dialog
        dialog.showModal();
    });
});