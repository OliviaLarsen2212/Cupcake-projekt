window.addEventListener('load', function() {
    // ====== GLIDER SETUP ======

    const toppingGlider = new Glider(document.querySelector('.topping-slider'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        dots: '.dots',
        arrows: {
            prev: '.topping-prev',
            next: '.topping-next'
        }
    });

    const bottomGlider = new Glider(document.querySelector('.bottom-slider'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        dots: '.dots',
        arrows: {
            prev: '.bottom-prev',
            next: '.bottom-next'
        }
    });

    // LOOP-effekt for topping
    document.querySelector('.topping-next').addEventListener('click', () => {
        if (toppingGlider.page === toppingGlider.slides.length - 1) {
            toppingGlider.scrollItem(0);
        }
    });

    document.querySelector('.topping-prev').addEventListener('click', () => {
        if (toppingGlider.page === 0) {
            toppingGlider.scrollItem(toppingGlider.slides.length - 1);
        }
    });

    // LOOP-effekt for bottom
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

    // ====== VALG AF TOPPING OG BUND ======

    document.querySelectorAll(".topping-image").forEach(img => {
        img.addEventListener("click", () => {
            document.querySelectorAll(".topping-image").forEach(i => i.classList.remove("selected"));
            img.classList.add("selected");

            // Gem valgte topping ID i skjult inputfelt
            document.getElementById("selectedToppingId").value = img.dataset.id;
        });
    });

    document.querySelectorAll(".bottom-image").forEach(img => {
        img.addEventListener("click", () => {
            document.querySelectorAll(".bottom-image").forEach(i => i.classList.remove("selected"));
            img.classList.add("selected");

            // Gem valgte bund ID i skjult inputfelt
            document.getElementById("selectedBottomId").value = img.dataset.id;
        });
    });

    // ====== "Add to cart" knap ======

    document.querySelector("#cupcakeForm").addEventListener("submit", (e) => {
        const toppingId = document.getElementById("selectedToppingId").value;
        const bottomId = document.getElementById("selectedBottomId").value;

        if (!toppingId || !bottomId) {
            e.preventDefault(); // stopper form fra at blive sendt
            alert("Please select both a topping and a bottom!");
        }
    });
});