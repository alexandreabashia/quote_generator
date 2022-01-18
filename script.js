const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
    if (!loading.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}



async function getQuote() {
    loading();
    await fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "quotes15.p.rapidapi.com",
            "x-rapidapi-key": "9b1aea782fmshc91ad487ccc9c68p17128fjsn08e4f315a9a6"
        }
    })
        .then(response => response.json())
        .then(response => {
            //if author is blank add 'Unknown'
            if (response.originator.name === '') {
                authorText.innerText = "Unknown"
            } else {
                authorText.innerText = response.originator.name;
            }

            // reduce font size for long quotes
            if (response.content.length > 50) {
                quoteText.classList.add('long-quote')
            } else {
                quoteText.classList.remove('long-quote')
            }

            quoteText.innerText = response.content;
            complete();
            console.log(response.originator.name);
            console.log(response.content);
        })
        .catch(err => {
            console.error(err);
        });
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}


// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote)

//ON Load
getQuote()




/* OLD API EXAMPLE, doesnt work without CORS
get quote from API
async function getQuote() {
    loading();
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

    try {
        const response = await fetch(apiUrl);
        const data = await response.json()

        //if author is blank add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = "Unknown"
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // reduce font size for long quotes
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }

        quoteText.innerText = data.quoteText;
        // stop loader and show quote
        complete();
    } catch (error) {
        getQuote();
    }
}

*/