const api = "https://api.quotable.io/random";
let data;
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
async function getQuote() {
  const response = await fetch(api);
  data = await response.json();

  quote.innerHTML = data.content;
  author.innerHTML = `- ${data.author}`;
}

function tweet() {
  window.open(
    (href = `https://twitter.com/intent/tweet?text=${quote.innerHTML} ${author.innerHTML}`),
    "Tweet Window ",
    "width=600",
    "height=300"
  );
}

getQuote();
