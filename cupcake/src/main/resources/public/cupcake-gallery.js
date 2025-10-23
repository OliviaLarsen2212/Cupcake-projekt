window.addEventListener('load', function() {
    // TOPPING SLIDER
    new Glider(document.querySelector('.topping-slider'), {
        slidesToShow: 1,       // kun ét billede ad gangen
        slidesToScroll: 1,
        draggable: false,
        dots: '.dots',
        arrows: {
            prev: '.topping-prev',
            next: '.topping-next'
        }
    });

    // BOTTOM SLIDER
    new Glider(document.querySelector('.bottom-slider'), {
        slidesToShow: 1,       // kun ét billede ad gangen
        slidesToScroll: 1,
        draggable: false,
        dots: '.dots',
        arrows: {
            prev: '.bottom-prev',
            next: '.bottom-next'
        }
    });

    // ⭕ LOOP-effekt for topping
    document.querySelector('.topping-next').addEventListener('click', () => {
        if (toppingGlider.page === toppingGlider.slides.length - 1) {
            toppingGlider.scrollItem(0); // hop tilbage til start
        }
    });

    document.querySelector('.topping-prev').addEventListener('click', () => {
        if (toppingGlider.page === 0) {
            toppingGlider.scrollItem(toppingGlider.slides.length - 1); // hop til slutning
        }
    });

    // ⭕ LOOP-effekt for bottom
    document.querySelector('.bottom-next').addEventListener('click', () => {
        if (bottomGlider.page === bottomGlider.slides.length - 1) {
            bottomGlider.scrollItem(0);
        }
    });

    document.querySelector('.bottom-prev').addEventListener('click', () => {
        if (bottomGlider.page === 0) {
            bottomGlider.scrollItem(bottomGlider.slides.length - 1);
        }
    });

    // Gør billeder klikbare som valg
    document.querySelectorAll('.glider img').forEach(img => {
        img.addEventListener('click', () => {
            const parent = img.closest('.glider');
            parent.querySelectorAll('img').forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
        });
    });

    // "Add to cart" knap
    document.getElementById('addToCart').addEventListener('click', () => {
        const topping = document.querySelector('.topping-slider img.selected')?.dataset.value;
        const bottom = document.querySelector('.bottom-slider img.selected')?.dataset.value;

        if (!topping || !bottom) {
            alert('Please select both a topping and a bottom!');
        } else {
            alert(`You added a ${topping} + ${bottom} cupcake!`);
        }
    });
});