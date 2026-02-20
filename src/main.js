import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import {
  gallery,
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  updateLightBox,
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
hideLoader();
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const query = form.elements['search-text'].value.toLowerCase().trim();
  if (!query) return;
  clearGallery();
  showLoader();
  getImagesByQuery(query)
    .then(res => {
      hideLoader();
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
      hideLoader();
      handleErrorMessage(error.message);
    });
});
