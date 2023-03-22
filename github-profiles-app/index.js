const URL = "https://api.github.com/users/";

const container = document.getElementById("container");
const input = document.getElementById("username");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = input.value;

  fetchUser(username);
});

async function fetchUser(username) {
  const response = await fetch(URL + username);
  const data = await response.json();

  displayUserCard(data);
}

const displayUserCard = (data) => {
  let html = "";

  console.log(data);
  if (data !== null) {
    const { login, followers, following, avatar_url, public_repos, bio } = data;
    html += `
        <div class="user-card">
            <div class="user-img-container">
                <img src="${avatar_url}" alt="user image">
            </div>

            <div class="user-data-container">
                <h3>${login}</h3>
                <h5>${bio}</h5>

                <div class="about-user-data">
                    <article>
                        <h6>Public Repos</h6>
                        <span>${public_repos}</span>
                    </article>
                    <article>
                        <h6>Followers</h6>
                        <span>${followers}</span>
                    </article>
                    <article>
                        <h6>Following</h6>
                        <span>${following}</span>
                    </article>
                </div>
            </div>
        </div>`;

    container.innerHTML += html;
  }
};
