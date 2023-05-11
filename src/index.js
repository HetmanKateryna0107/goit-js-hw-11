import { getAllCards } from './pixabay.js';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const input = document.querySelector('input');
console.log(input);
btnLoadMore.style.display = 'none';

let page = 1;
let clickGetData = true;

input.addEventListener('input', inputSearchQuery);
function inputSearchQuery() {
  
  page = 1;
  clickGetData = true;
};

const getData = async () => {
  if (clickGetData) {
    try {
      const data = await getAllCards(form.elements.searchQuery.value, page);
      // console.log('data :>> ', data);
      if (data.totalHits < 40) {
        if (data.hits.length > 0) {
          clickGetData = false;
          // console.log('data :>> ', clickGetData);
          btnLoadMore.style.display = 'none';
          createEl(data.hits, page);
          Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
          return;
        } else {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } else if (data.hits.length > 0) {
        if (page === 1) {
          console.log(page);
          Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        }
        btnLoadMore.style.display = 'block';
        createEl(data.hits, page);
        if (page * 40 > data.totalHits) {
          btnLoadMore.style.display = 'none';
          clickGetData = false;
        }
        page += 1;
      }
    } catch (error) {
      throw Error(error);
    }
  }
};

const clickLoadMore = () => {
  btnLoadMore.style.display = 'none';
  getData();
};
btnLoadMore.addEventListener('click', clickLoadMore);

const onSubmitBtn = async e => {
  e.preventDefault();
  if (!form.elements.searchQuery.value) {
    gallery.innerHTML = '';
    btnLoadMore.style.display = 'none';
    return;
  }
  if (page === 1){
    gallery.innerHTML=""
    btnLoadMore.style.display = 'none';
  }
   getData();
};

form.addEventListener('submit', onSubmitBtn);
const card = img => {
  return `<div class="photo-card">
    <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" width="300" height="200"/>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${img.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${img.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${img.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${img.downloads}</b>
        </p>
      </div>
    </div>`;
};
const createEl = arr => {
  const arrey = arr.map(card).join('');
  gallery.insertAdjacentHTML('beforeend', arrey);
};
