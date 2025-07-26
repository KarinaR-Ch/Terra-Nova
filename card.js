        // Анімація обертання карток
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function () {
                this.classList.toggle('flipped');
            });
        });

        // Скидання анімації при перезавантаженні
        window.addEventListener('beforeunload', function () {
            document.querySelectorAll('.card-container').forEach(container => {
                container.style.animation = 'none';
            });
        });