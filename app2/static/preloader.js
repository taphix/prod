async function makeApiRequest() {
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    const keywordValue = urlObj.searchParams.get("keyword");

    fetch(`/process?keyword=${keywordValue}`)
        .then(response => response.text())
        .then(data => {
            document.open();
            document.write(data);
            document.close();
            setTimeout(hidePreloader, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
            setTimeout(hidePreloader, 2000);
        });
}

function hidePreloader() {
    document.getElementById('preloader').style.display = 'none';
}

makeApiRequest();