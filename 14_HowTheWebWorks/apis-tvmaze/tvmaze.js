"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $episodesList = $("#episodes-list");
const $searchForm = $("#search-form");
const $episodeSearch = $("#episode-search");

/** Given a search term, search for tv shows that match that query.
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  console.log("search for term");

  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${term}`);
  const showsList = res.data;
  const shows = [];

  for (let i = 0; i < showsList.length; i++) {
    let defaultImg = "https://tinyurl.com/tv-missing";
    shows.push({
      id: showsList[i].show.id,
      name: showsList[i].show.name,
      summary: showsList[i].show.summary,
      image: showsList[i].show.image
        ? showsList[i].show.image.original
        : defaultImg,
    });
  }

  return shows;
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  console.log("populate shows");

  $showsList.empty();
  for (let i = 0; i < shows.length; i++) {
    const $show = $(
      `<div data-show-id="${shows[i].id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${shows[i].image}" 
              alt="${shows[i].name}" 
              class="card-img-top w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${shows[i].name}</h5>
             <div><small>${shows[i].summary}</small></div>
             <button id="episode-search" class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `
    );

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const res = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  const episodeList = res.data;
  const episodes = [];
  for (let i = 0; i < episodeList.length; i++) {
    episodes.push({
      id: episodeList[i].id,
      name: episodeList[i].name,
      season: episodeList[i].season,
      number: episodeList[i].number,
    });
  }
  return episodes;
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) {
  $episodesList.empty();
  for (let i = 0; i < episodes.length; i++) {
    let id = episodes[i].id;
    let name = episodes[i].name;
    let season = episodes[i].season;
    let number = episodes[i].number;
    const $episode = $(
      `<li class="m-2" id="${id}">${name} (season ${season}, number ${number})</li>`
    );

    $episodesArea.append($episode);
  }
}

async function searchForEpisodeAndDisplay(id) {
  const episodes = await getEpisodesOfShow(id);

  $episodesArea.show();
  populateEpisodes(episodes);
}

$showsList.on("click", async function (e) {
  const showId = $(e.target).parent().parent().parent().data("showId");
  await searchForEpisodeAndDisplay(showId);
});
