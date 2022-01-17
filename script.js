


document.getElementById('quote_btn').addEventListener('click', function () {
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "quotes15.p.rapidapi.com",
            "x-rapidapi-key": "9b1aea782fmshc91ad487ccc9c68p17128fjsn08e4f315a9a6"
        }
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
})