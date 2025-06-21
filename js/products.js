document.addEventListener('DOMContentLoaded', function() {
    // Toggle filters on mobile
    const filterToggle = document.querySelector('.filter-toggle');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    
    if (filterToggle && filtersSidebar) {
        filterToggle.addEventListener('click', function() {
            filtersSidebar.classList.toggle('active');
        });
    }
    
    // Price range slider
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const priceValues = document.querySelector('.price-values');
            if (priceValues) {
                priceValues.firstElementChild.textContent = `₹0`;
                priceValues.lastElementChild.textContent = `₹${this.value}`;
            }
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // In a real app, this would fetch sorted products from the server
            console.log('Sorting by:', this.value);
        });
    }
    
    // Apply filters button
    const applyFiltersBtn = document.querySelector('.apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Get all selected filters
            const priceMax = priceRange ? priceRange.value : 5000;
            const selectedOccasions = [];
            document.querySelectorAll('input[name="occasion"]:checked').forEach(checkbox => {
                selectedOccasions.push(checkbox.value);
            });
            
            // In a real app, this would fetch filtered products from the server
            console.log('Applying filters:', {
                priceMax,
                selectedOccasions
            });
            
            showNotification('Filters applied successfully');
        });
    }
});
