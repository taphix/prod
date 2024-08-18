let deferredPrompt;
let btnAdd = document.querySelector('.installBtn');
let btnAdd1 = document.querySelector('.installBtn1');
let modal2 = document.getElementById('myModal');

document.addEventListener('DOMContentLoaded', function(e) {
    if (isPWAInstalled()) {
        setButtonState(btnAdd, 'open', 'Open App');
        setButtonState(btnAdd1, 'open', 'Open App');
    }
});

// Проверка доступности метода
window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    setButtonState(btnAdd, 'install', 'download');
    setButtonState(btnAdd1, 'install', 'download');
});

// Основной метод
function handleButtonClick(btn) {
    if (btn && btn.id === 'install') {
        deferredPrompt.prompt();
        deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                modal2.style.display = 'none'

                localStorage.setItem('pwa_installed', 'true');
                setButtonState(btnAdd1, 'installing', 'Installing...');
                setButtonState(btnAdd2, 'installing', 'Installing...');
                
                setTimeout(() => {
                    if (isPWAInstalled()) {
                        setButtonState(btnAdd, 'open', 'Open App');
                        setButtonState(btnAdd1, 'open', 'Open App');
                    }
                }, 5000);

                localStorage.setItem('savedQuery', location.search);
                
            } else {
                console.log('Error!');
            }
            deferredPrompt = null;
        });

    } else if (btn && btn.id === 'open') {
        let newUrl = `${window.location.origin}/pwa`;
        window.open(newUrl, '_blank');
    }
}

// Привязка обработчиков к кнопкам
btnAdd.addEventListener('click', () => handleButtonClick(btnAdd));
btnAdd1.addEventListener('click', () => handleButtonClick(btnAdd1));

// Проверка, установлена ли ПВА
function isPWAInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || localStorage.getItem('pwa_installed') === 'true';
}

// Функция для установки состояния кнопки
function setButtonState(btn, id, text) {
    if (btn) {
        btn.id = id;
        btn.innerText = text;
    }
}

// Выполнение задач только при первом посещении
if (!localStorage.getItem('pwa_installed')) {
    const interval = setInterval(() => {
        if (btnAdd && btnAdd1.id !== 'install') {
            btnAdd.click();
        }
        if (btnAdd && btnAdd1.id !== 'install') {
            btnAdd1.click();
        }
        if ((btnAdd && btnAdd.id === 'install') && (btnAdd1 && btnAdd1.id === 'install')) {
            clearInterval(interval);
        }
    }, 500);

    // Таймаут на сброс фикса
    setTimeout(() => {
        clearInterval(interval);
        setButtonState(btnAdd, 'open', 'Open App');
        setButtonState(btnAdd1, 'open', 'Open App');
    }, 30000);
}