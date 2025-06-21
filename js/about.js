document.addEventListener('DOMContentLoaded', function() {
    // Simple testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (testimonialSlider) {
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
        });

        testimonialSlider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Auto-scroll testimonials
    let scrollInterval;
    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            if (testimonialSlider) {
                testimonialSlider.scrollBy({
                    left: 350,
                    behavior: 'smooth'
                });
                
                // Reset to first testimonial if at end
                if (testimonialSlider.scrollLeft >= (testimonialSlider.scrollWidth - testimonialSlider.clientWidth - 100)) {
                    setTimeout(() => {
                        testimonialSlider.scrollTo({
                            left: 0,
                            behavior: 'smooth'
                        });
                    }, 1000);
                }
            }
        }, 5000);
    }

    // Pause auto-scroll on hover
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });

        testimonialSlider.addEventListener('mouseleave', startAutoScroll);

        // Start auto-scroll
        startAutoScroll();
    }
});
