"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system */

class Story {
  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  getHostName() {
    return new URL(this.url).host;
  }
}

/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** Generate a new StoryList */

  static async getStories() {
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    const stories = response.data.stories.map((story) => new Story(story));
    return new StoryList(stories);
  }

  /** Adds story data to API, makes a Story instance, adds it to story list.
   ** Returns the new Story instance
   */

  async addStory(user, { title, author, url }) {
    const token = user.loginToken;
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/stories`,
      data: { token, story: { title, author, url } },
    });

    const story = new Story(res.data.story);
    this.stories.unshift(story);
    user.ownStories.unshift(story);

    return story;
  }

  async deleteStory(user, story) {
    $userStoriesList.hide();

    const storyId = story.storyId;
    const token = user.loginToken;
    await axios({
      method: "DELETE",
      url: `${BASE_URL}/stories/${storyId}`,
      data: { token },
    });

    user.ownStories = user.ownStories.filter((s) => s !== story);

    putUpMyStories();
    $userStoriesList.show();
  }

  async sendUpdatedStory(user, $story) {
    $userStoriesList.hide();

    const token = user.loginToken;
    const res = await axios({
      method: "PATCH",
      url: `${BASE_URL}/stories/${$story.storyId}`,
      data: {
        token,
        story: { author: $story.author, title: $story.title, url: $story.url },
      },
    });

    user.ownStories = user.ownStories.filter(
      (s) => s.storyId !== $story.storyId
    );
    this.stories = this.stories.filter((s) => s.storyId !== $story.storyId);

    const story = new Story(res.data.story);
    this.stories.unshift(story);
    user.ownStories.unshift(story);
  }
}

/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
  constructor(
    { username, name, createdAt, favorites = [], ownStories = [] },
    token
  ) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;
    this.favorites = favorites.map((s) => new Story(s));
    this.ownStories = ownStories.map((s) => new Story(s));
    this.loginToken = token;
  }

  /** Register new user in API, make User instance & return it. */

  static async signup(username, password, name) {
    try {
      const response = await axios({
        url: `${BASE_URL}/signup`,
        method: "POST",
        data: { user: { username, password, name } },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories,
        },
        response.data.token
      );
    } catch (e) {
      alert("Username has been taken or is invalid, try again");
    }
  }

  /** Login in user with API, make User instance & return it. */

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories,
      },
      response.data.token
    );
  }

  /** Log users in automatically. */

  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories,
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

  async updateFavorite(update, story) {
    const token = this.loginToken;
    const method = update === "add" ? "POST" : "DELETE";
    await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${story.storyId}`,
      method: method,
      data: { token },
    });
  }

  async addFavorite(story) {
    if (!this.favorites.includes(story)) {
      this.favorites.push(story);
      await this.updateFavorite("add", story);
    }
  }

  async removeFavorite(story) {
    this.favorites = this.favorites.filter((s) => s.storyId !== story.storyId);
    await this.updateFavorite("remove", story);
  }

  async updateUser(user, userName, username, password) {
    const token = user.loginToken;
    const response = await axios({
      url: `${BASE_URL}/users/${user.username}`,
      method: "PATCH",
      data: { token, user: { userName, username, password } },
    });
  }
}
