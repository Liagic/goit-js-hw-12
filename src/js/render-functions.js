import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export function createGallery(images) {
  const items = images
    .map(
      ({
        webformatURL = '',
        largeImageURL = '',
        tags = '',
        likes = '0',
        views = '0',
        comments = '0',
        downloads = '0',
      }) => {
        if (webformatURL.trim() != '' || largeImageURL.trim() != '') {
          return `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      data-source="${largeImageURL}"
      alt="${tags}"
      width="360" height="200";
    />
    <ul class="gallery-additional-info">
    <li class="additional-info-text"><span class="additional-info-label">Likes</span>
    <span class="additional-info-value">${likes}</span></li>
    <li class="additional-info-text"><span class="additional-info-label">Views</span>
    <span class="additional-info-value">${views}</span></li>
    <li class="additional-info-text"><span class="additional-info-label">Comments</span>
    <span class="additional-info-value">${comments}</span></li>
    <li class="additional-info-text"><span class="additional-info-label">Downloads</span>
    <span class="additional-info-value">${downloads}</span></li>
    </ul>
  </a>
</li>`;
        }
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', items);
  updateLightBox();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('loader');
}

export function hideLoader() {
  loader.classList.remove('loader');
}

export function updateLightBox() {
  let lb = new SimpleLightbox('.gallery-link', {
    captionsData: 'alt',
    captionDelay: 250,
    navText: [
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.031 2.469C17.1008 2.53867 17.1563 2.62143 17.1941 2.71255C17.2319 2.80367 17.2513 2.90135 17.2513 3C17.2513 3.09865 17.2319 3.19633 17.1941 3.28745C17.1563 3.37857 17.1008 3.46133 17.031 3.531L8.5605 12L17.031 20.469C17.1718 20.6098 17.2509 20.8008 17.2509 21C17.2509 21.1992 17.1718 21.3902 17.031 21.531C16.8902 21.6718 16.6992 21.7509 16.5 21.7509C16.3008 21.7509 16.1098 21.6718 15.969 21.531L6.969 12.531C6.89915 12.4613 6.84374 12.3786 6.80593 12.2874C6.76812 12.1963 6.74866 12.0986 6.74866 12C6.74866 11.9013 6.76812 11.8037 6.80593 11.7125C6.84374 11.6214 6.89915 11.5387 6.969 11.469L15.969 2.469C16.0387 2.39915 16.1214 2.34374 16.2125 2.30593C16.3037 2.26812 16.4013 2.24866 16.5 2.24866C16.5986 2.24866 16.6963 2.26812 16.7874 2.30593C16.8786 2.34374 16.9613 2.39915 17.031 2.469Z" fill="black" />
</svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.96912 2.469C7.03879 2.39915 7.12155 2.34374 7.21267 2.30593C7.30379 2.26812 7.40147 2.24866 7.50012 2.24866C7.59877 2.24866 7.69645 2.26812 7.78757 2.30593C7.87869 2.34374 7.96145 2.39915 8.03112 2.469L17.0311 11.469C17.101 11.5387 17.1564 11.6214 17.1942 11.7125C17.232 11.8037 17.2515 11.9013 17.2515 12C17.2515 12.0986 17.232 12.1963 17.1942 12.2874C17.1564 12.3786 17.101 12.4613 17.0311 12.531L8.03112 21.531C7.89029 21.6718 7.69928 21.7509 7.50012 21.7509C7.30096 21.7509 7.10995 21.6718 6.96912 21.531C6.82829 21.3902 6.74917 21.1992 6.74917 21C6.74917 20.8008 6.82829 20.6098 6.96912 20.469L15.4396 12L6.96912 3.531C6.89927 3.46133 6.84386 3.37857 6.80605 3.28745C6.76824 3.19633 6.74878 3.09865 6.74878 3C6.74878 2.90135 6.76824 2.80367 6.80605 2.71255C6.84386 2.62143 6.89927 2.53867 6.96912 2.469Z" fill="black" />
</svg>`,
    ],
    closeText: `<svg width="14" height="14" viewBox="0 0 14 14" fill="#000" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.293787 0.293787C0.386678 0.200661 0.497029 0.126775 0.61852 0.0763616C0.74001 0.0259488 0.870253 0 1.00179 0C1.13332 0 1.26356 0.0259488 1.38505 0.0763616C1.50654 0.126775 1.6169 0.200661 1.70979 0.293787L7.00179 5.58779L12.2938 0.293787C12.3868 0.200811 12.4971 0.127058 12.6186 0.0767403C12.7401 0.0264221 12.8703 0.000523567 13.0018 0.000523567C13.1333 0.000523567 13.2635 0.0264221 13.385 0.0767403C13.5064 0.127058 13.6168 0.200811 13.7098 0.293787C13.8028 0.386763 13.8765 0.497141 13.9268 0.61862C13.9772 0.740099 14.003 0.870299 14.003 1.00179C14.003 1.13327 13.9772 1.26348 13.9268 1.38495C13.8765 1.50643 13.8028 1.61681 13.7098 1.70979L8.41579 7.00179L13.7098 12.2938C13.8028 12.3868 13.8765 12.4971 13.9268 12.6186C13.9772 12.7401 14.003 12.8703 14.003 13.0018C14.003 13.1333 13.9772 13.2635 13.9268 13.385C13.8765 13.5064 13.8028 13.6168 13.7098 13.7098C13.6168 13.8028 13.5064 13.8765 13.385 13.9268C13.2635 13.9772 13.1333 14.003 13.0018 14.003C12.8703 14.003 12.7401 13.9772 12.6186 13.9268C12.4971 13.8765 12.3868 13.8028 12.2938 13.7098L7.00179 8.41579L1.70979 13.7098C1.61681 13.8028 1.50643 13.8765 1.38495 13.9268C1.26348 13.9772 1.13327 14.003 1.00179 14.003C0.870299 14.003 0.740099 13.9772 0.61862 13.9268C0.497141 13.8765 0.386763 13.8028 0.293787 13.7098C0.200811 13.6168 0.127058 13.5064 0.0767403 13.385C0.0264221 13.2635 0.000523567 13.1333 0.000523567 13.0018C0.000523567 12.8703 0.0264221 12.7401 0.0767403 12.6186C0.127058 12.4971 0.200811 12.3868 0.293787 12.2938L5.58779 7.00179L0.293787 1.70979C0.200661 1.6169 0.126775 1.50654 0.0763616 1.38505C0.0259488 1.26356 0 1.13332 0 1.00179C0 0.870253 0.0259488 0.74001 0.0763616 0.61852C0.126775 0.497029 0.200661 0.386678 0.293787 0.293787Z" fill="black" />
</svg>`,
  });
  lb.refresh();
}
