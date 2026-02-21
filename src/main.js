import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import {
  gallery,
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  hideLoadButton,
  showLoadButton,
} from './js/render-functions';

function handleErrorMessage(message = 'Something went wrong') {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    theme: 'dark',
    icon: '',
    iconUrl: '../img/error.svg',
    backgroundColor: '#ef4040',
  });
}
function loadButtonHandler() {
  let query = sessionStorage.getItem('search-text');
  showLoader();
  current_page += 1;
  if (!query) return;
  getImagesByQuery(query, current_page)
    .then(res => {
      if (res.hits.length === 0) {
        return Promise.reject(
          new Error(
            'Sorry, there are no images matching your search query. Please try again!'
          )
        );
      }
      createGallery(res.hits);
    })
    .catch(error => {
      handleErrorMessage(error.message);
    })
    .finally(() => {
      hideLoader();
    });
  if (current_page >= total_pages) {
    handleErrorMessage(
      `We're sorry, but you've reached the end of search results.`
    );
    hideLoadButton();
    return;
  }
}
const form = document.querySelector('.form');
const more_button = document.querySelector('.load-more');
let current_page = 1;
let total_pages = 0;

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = form.elements['search-text'].value.toLowerCase().trim();
  if (!query) return;
  sessionStorage.setItem('search-text', query);
  clearGallery();
  showLoader();
  current_page = 1;
  getImagesByQuery(query, current_page)
    .then(res => {
      if (res.hits.length === 0) {
        return Promise.reject(
          new Error(
            'Sorry, there are no images matching your search query. Please try again!'
          )
        );
      }
      total_pages = Math.ceil(res.totalHits / 15);
      createGallery(res.hits);
      if (total_pages == current_page) {
        handleErrorMessage(
          `We're sorry, but you've reached the end of search results.`
        );
        hideLoadButton();
      } else {
        showLoadButton();
      }
    })
    .catch(error => {
      handleErrorMessage(error.message);
    })
    .finally(() => hideLoader());
});
more_button.addEventListener('click', loadButtonHandler);
