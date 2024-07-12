let deferredPrompt;
let btnAdd = document.querySelector('.installBtn');

// Обработчик проверки на прогрузку страницы
document.addEventListener('DOMContentLoaded', function(e) {
    if (isPWAInstalled()) {
        btnAdd.id = 'open';
        btnAdd.innerText = 'Open App';
    }
});

// Проверка доступности метода
window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    btnAdd.id = 'install';
    btnAdd.innerText = 'DOWNLOAD APP';
});

// Основной метод
btnAdd.addEventListener('click', (e) => {
    if (btnAdd && btnAdd.id === 'install') {
        deferredPrompt.prompt();
        deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                localStorage.setItem('pwa_installed', 'true');

                btnAdd.innerText = 'Installing...';
                
                setTimeout(() => {
                    if (isPWAInstalled()) {
                        btnAdd.id = 'open';
                        btnAdd.innerText = 'Open App';
                    }
                }, 5000);

                localStorage.setItem('savedQuery', location.search);
                
            } else {
                console.log('Error!');
            }
            deferredPrompt = null;
        });

    } else if (btnAdd && btnAdd.id === 'open') {
        let newUrl = `${window.location.origin}/pwa`;
        window.open(newUrl, '_blank');
    }
});

// Проверка, установлена ли ПВА
function isPWAInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || localStorage.getItem('pwa_installed') === 'true';
}

// Выполнение задач только при первом посещении
if (!localStorage.getItem('pwa_installed')) {
    // Фикс кнопки в случае залагивания
    const interval = setInterval(() => {
        if (btnAdd && btnAdd.id !== 'install') {
            if (btnAdd) btnAdd.click();
        } else {
            clearInterval(interval);
        }
    }, 500);

    // Таймаут на сброс фикса
    setTimeout(() => {
        clearInterval(interval);
        if (btnAdd) btnAdd.id = 'install';
        btnAdd.innerText = 'Install App';
    }, 30000);
}
