// import { navigate } from '../router/router.js';
// import { out } from '../firebase/auth.js';
import { orderBy } from 'firebase/firestore';
import { Header } from '../utils/header.js';
import { Footer } from '../utils/footer.js';
import {
  readingPost, editPost, gettingDoc, deletePost,
} from '../firebase/firestore.js';
import { navigate } from '../router/router.js';

const Home = () => {
  const container = document.createElement('div');
  container.className = 'home-page';

  readingPost((post) => {
    container.innerHTML = '';
    let postStructure = '';
    // console.log(post);

    post.forEach((doc) => {
      const posts = doc.data();
      postStructure += `
      <div class="post-border">
      <div class='post'>
          <span>
              <p class="date">${posts.date.toDate().toLocaleString()}</p>
          </span>
          <p class="user-container">
              <i class="user-name">${posts.userName}: </i>
          </p>
          <div class"movie-info">
              <h3 class="movie-title">${posts.movie}</h3>
              <p class="movie-review">${posts.review}</p>
              <p class='info'><b>País:</b> ${posts.country} </p>
          </div>
      </div>
      <div class="likes-border">
          <button class="btn-like" value=${doc.id}>
          <i class="fas fa-heart"></i>
          </button>
      </div>
  </div>
    `;
    });

    const middle = document.createElement('div');
    middle.className = 'middle';
    middle.innerHTML = postStructure;
    container.append(Header(), middle, Footer());

    const editBtn = container.querySelectorAll('.btn-Edit');
    const modal = container.querySelectorAll('.dialog-modal');

    // Open Modal
    editBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        modal.forEach((mod) => {
          if (mod.dataset.id === btn.dataset.id) {
            mod.showModal();

            // Updating Post
            const doneBtn = mod.querySelector('#done-button');
            doneBtn.addEventListener('click', async () => {
              const newReview = mod.querySelector('#new-review').value;
              const newMovie = mod.querySelector('#new-movie').value;
              const newCountry = mod.querySelector('#new-country').value;
              await editPost(mod.dataset.id, newReview, newMovie, newCountry);
            });
          }
        });
      });
    });
    const deleteBtn = container.querySelectorAll('.btn-Delete');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', async () => {
        await deletePost(btn.dataset.id);
      });
    });
  });

  return container;
};

export { Home };
