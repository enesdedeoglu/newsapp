
const url =
"http://newsapi.org/v2/top-headlines?country=tr&apiKey=79af8a0825ba4443adf9c1f76f8913cb";

export async function getNews(url) {
let result = await fetch(url).then(response => response.json());
return result.articles;
}