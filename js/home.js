function burgerMenu() {
    document.getElementById('menuButton').addEventListener('click', function () {
        var navLinks = document.getElementById('burgerMenu');
        if (navLinks.style.display === 'block') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'block';
        }
    });
}

burgerMenu();