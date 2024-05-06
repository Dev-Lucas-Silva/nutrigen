const links = document.querySelectorAll('a');

export function handleClickHistoryApi(event) {
  event.preventDefault();
  fetchPage(event.target.href, event.target.attributes.href.value);
  window.history.pushState(null, null, event.target.href);
}

async function fetchPage(url) {
  document.querySelector('.main').innerHTML = `<div class="loading-container">
  <div class="loading"></div>
</div>`;
  const pageResponse = await fetch(url);
  const pageText = await pageResponse.text();
  replaceContent(pageText);
}

function replaceContent(newText) {
  const newHtml = document.createElement('div');
  newHtml.innerHTML = newText;

  const oldContent = document.querySelector('.main');
  const newContent = newHtml.querySelector('.main');

  oldContent.innerHTML = newContent.innerHTML;
  document.title = newHtml.querySelector('title').innerText;
}

window.addEventListener('popstate', () => {
  fetchPage(window.location.href);
})

export function initHistoryApi() {
  links.forEach(link => {
    if (link.classList.contains('history-api')) {
      link.addEventListener('click', handleClickHistoryApi);
    }
 })
}