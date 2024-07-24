// ---- ---- Const ---- ---- //
const cookiesBox = document.querySelector('.cookies'),
    buttons = document.querySelectorAll('.button');

// ---- ---- Show ---- ---- //
const executeCodes = () => {
    if (document.cookie.includes('aviator')) return;
    cookiesBox.classList.add('show');

    // ---- ---- Button ---- ---- //
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            cookiesBox.classList.remove('show');

            // ---- ---- Time ---- ---- //
            // if (button.id == 'acceptBtn') {
            //     document.cookie =
            //         'cookieBy= aviator; max-age=' + 60 * 60 * 24 * 30;
            // }
        });
    });
};

window.addEventListener('load', executeCodes);
