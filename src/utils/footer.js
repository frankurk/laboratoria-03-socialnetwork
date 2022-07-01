import { navigate } from '../router/router.js';

export const Footer = () => {
  const template = // HTML
  `
  <button id="mapButton"><i class="fas fa-map"></i></button>
  <button id="postButton">+</button>
  <button id="infoImg">
    <i class="fas fa-question"></i>
  </button>
  <dialog class="infoModal">
  <button id="discardButtonInfo" class="btn-discard">x</button>
  <h1 class="brand-name">JunkTube</h1>
  <h3 class="brand-slogan">Travel through films!</h3>
  <h3 class="brand-slogan">Truly unique. Usually whimsy</h2>
  <h3 class="brand-slogan">Share film locations around the world. Inspire others to visit!</h3>
  </dialog>
  `;

  const container = document.createElement('footer');
  container.className = 'footer';
  container.innerHTML = template;
  const infoModal = container.querySelector('.infoModal');

  // btn to to map view
  const buttonMap = container.querySelector('#mapButton');
  buttonMap.addEventListener('click', () => {
    navigate('/map');
  });

  // Central btn to create a new post
  const postBtn = container.querySelector('#postButton');
  postBtn.addEventListener('click', () => {
    navigate('/post');
  });

  // btn to search - filter posts
  const searchBtn = container.querySelector('#infoImg');
  searchBtn.addEventListener('click', () => {
    infoModal.showModal();
  });

  const discardModal = container.querySelector('#discardButtonInfo');
  discardModal.addEventListener('click', () => {
    infoModal.close();
  });

  return container;
};

export default Footer;
