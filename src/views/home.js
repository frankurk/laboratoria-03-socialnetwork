import { Header } from '../utils/header.js';
import { Footer } from '../utils/footer.js';
import {
  readingPost, likingPost,
} from '../firebase/firestore.js';
import movieIcon from '../img/movie-icon.svg';

const Home = () => {
  const container = document.createElement('div');
  container.className = 'home-page';
  const userUid = localStorage.getItem('userUid');
  readingPost((post) => {
    container.innerHTML = '';
    let postStructure = '';
    post.forEach((doc) => {
      const posts = doc.data();
      postStructure += // HTML
      `
      <div class="post">
        <div class='post-header'>
          <p class='user-info'><img class="user-photo" src="${posts.photo}">
          <span class="user-name">${posts.userName} posted: </span> </p>
          <p class="movie-review">${posts.review}</p>
          <p class="date">${posts.date.toDate().toLocaleString()}</p>
        </div>
        <div class="post-main"> 
          <img src="${movieIcon}" class="movie-img">   
           <div class="movie-info">
            <div class="movie-title">${posts.movie}</div>
            <p class='movie-country'>${posts.country} </p>
           </div>
        </div>
        <div class="post-footer">
          <button class="btn-like" data-id="${doc.id}">
            <i class="fas fa-heart"></i>
            <span id="like-count" class="like-count"> ${posts.likesSum} </span>
          </button>
        </div>
      </div>
      `;
    });

    const middle = document.createElement('div');
    middle.className = 'middle';
    middle.innerHTML = postStructure;
    container.append(Header(), middle, Footer());

    // Liking a Post
    const likeBtn = container.querySelectorAll('.btn-like');
    likeBtn.forEach((btn) => {
      btn.addEventListener('click', async () => {
        await likingPost(btn.dataset.id,userUid);
      });
    });
  });

  return container;
};

export default Home;
