import {
  arrayToObject,
  objectToIDKeyedObject,
  addToArrayAndSort
} from "core/redux/util";
import { SERVER_PATH } from "core/constants";
import { showToast } from "core/ducks/toast";
import { push } from "react-router-redux";
import { createSelector } from "reselect";
import reducerRegistry from "core/redux/ReducerRegistry";
// import { history } from "core/redux/store";

/*
 * Blog actions
 */
const LIST_BLOG_POSTS = "LIST_BLOG_POSTS";
const DELETE_BLOG_ENTRY = "DELETE_BLOG_ENTRY";
const LOADING_BLOG_POSTS = "LOAD_BLOG_POSTS";
const BLOG_POSTS_ERRORED = "BLOG_POSTS_ERRORED";
const STORE_BLOG_POST = "STORE_BLOG_POST";
const SET_FILTER_TAGS = "SET_FILTER_TAGS";

/**
 * Reducer
 */
let initialState = {
  byId: {},
  allIds: [],
  filterTags: [],
  isLoading: false,
  hasErrored: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_BLOG_POSTS:
      let blogPosts = arrayToObject(action.blogPosts);
      return {
        ...state,
        byId: {
          ...blogPosts
        },
        allIds: Object.keys(blogPosts)
      };
    case DELETE_BLOG_ENTRY:
      return {
        ...state
      };
    case LOADING_BLOG_POSTS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case BLOG_POSTS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored,
        isLoading: false
      };
    case STORE_BLOG_POST:
      let blogPost = objectToIDKeyedObject(action.blogPost);
      return {
        ...state,
        byId: {
          ...state.byId,
          ...blogPost
        },
        allIds: addToArrayAndSort(state.allIds, action.blogPost.id.toString())
      };
    case SET_FILTER_TAGS:
      return {
        ...state,
        filterTags: action.tags
      };
    default:
      return state;
  }
}

reducerRegistry.register("blog", reducer);

/**
 * Action Creators
 */
function listBlogPosts(blogPosts) {
  return {
    type: LIST_BLOG_POSTS,
    blogPosts
  };
}

function removeBlogPost(id) {
  return {
    type: DELETE_BLOG_ENTRY,
    id
  };
}

function loadingBlogPosts(bool) {
  return {
    type: LOADING_BLOG_POSTS,
    isLoading: bool
  };
}

function blogHasErrored(bool) {
  return {
    type: BLOG_POSTS_ERRORED,
    hasErrored: bool
  };
}

function storeBlogPost(blogPost) {
  return {
    type: STORE_BLOG_POST,
    blogPost
  };
}

function setFilterTags(tags) {
  return {
    type: SET_FILTER_TAGS,
    tags: tags
  };
}

export function deleteBlogPost(id) {
  return function(dispatch, getState) {
    dispatch(loadingBlogPosts(true));
    fetch(`${SERVER_PATH}/api/blogposts/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: getState().auth.token
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingBlogPosts(false));
        return response;
      })
      .then(() => dispatch(removeBlogPost(id)))
      .then(() => dispatch(showToast("Blog post deleted")))
      .then(() => dispatch(push(`/`)))
      .catch(err => {
        dispatch(blogHasErrored(true));
        dispatch(showToast("Delete failed"));
      });
  };
}

export function addBlogPost(blogpost) {
  return function(dispatch, getState) {
    dispatch(loadingBlogPosts(true));
    fetch(`${SERVER_PATH}/api/blogposts/`, {
      method: "POST",
      body: JSON.stringify(blogpost),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: getState().auth.token
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingBlogPosts(false));
        return response;
      })
      .then(response => response.json())
      .then(blogPost => {
        dispatch(storeBlogPost(blogPost));
        blogpost = blogPost;
      })
      .then(() => dispatch(showToast("Blog post saved")))
      .then(() => dispatch(push(`/blog/${blogpost.id}`)))
      .catch(err => {
        console.log(err);
        dispatch(blogHasErrored(true));
        dispatch(showToast("Save failed"));
      });
  };
}

export function editBlogPost(blogpost) {
  return function(dispatch, getState) {
    dispatch(loadingBlogPosts(true));
    fetch(`${SERVER_PATH}/api/blogposts/${blogpost.id}`, {
      method: "PUT",
      body: JSON.stringify(blogpost),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: getState().auth.token
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingBlogPosts(false));
        return response;
      })
      // .then((response) => response.json()) // no response body on modify
      .then(() => dispatch(storeBlogPost(blogpost)))
      .then(() => dispatch(showToast("Blog post saved")))
      .then(() => dispatch(push(`/blog/${blogpost.id}`)))
      .catch(err => {
        console.log(err);
        dispatch(blogHasErrored(true));
        dispatch(showToast("Save failed"));
      });
  };
}

export function loadBlogPosts() {
  return function(dispatch) {
    dispatch(loadingBlogPosts(true));
    fetch(`${SERVER_PATH}/api/blogposts`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingBlogPosts(false));
        return response;
      })
      .then(response => response.json())
      .then(blogPosts => dispatch(listBlogPosts(blogPosts)))
      .catch(err => {
        console.log(err);
        dispatch(blogHasErrored(true));
      });
  };
}

export function loadBlogPost(id) {
  return function(dispatch) {
    dispatch(loadingBlogPosts(true));
    fetch(`${SERVER_PATH}/api/blogposts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingBlogPosts(false));
        return response;
      })
      .then(response => response.json())
      .then(blogPost => dispatch(storeBlogPost(blogPost)))
      .catch(err => {
        console.log(err);
        dispatch(blogHasErrored(true));
      });
  };
}

/**
 * Add the selected tag to the store & to the locations query paramaters
 * @param {*} location
 * @param {string} tag
 */
export function loadFilterTagsFromURL(location) {
  return function(dispatch) {
    const searchParams = new URLSearchParams(location.search);
    const tags = searchParams.getAll("tags") || [];
    dispatch(setFilterTags(tags));
  };
}

/**
 * Add the selected tag to the store & to the locations query paramaters
 * @param {*} location
 * @param {string} tag
 */
export function addFilterTag(location, tag) {
  return function(dispatch) {
    const searchParams = new URLSearchParams(location.search);
    let tags = searchParams.getAll("tags");
    if (tags.includes(tag)) {
      return;
    }
    searchParams.append("tags", tag);
    location.search = searchParams.toString();
    dispatch(push(location));
    tags = searchParams.getAll("tags");
    dispatch(setFilterTags(tags));
  };
}

/**
 * Removes the selected tag from the store & the locations query paramaters
 * @param {*} location
 * @param {string} removeTag
 */
export function removeFilterTag(location, removeTag) {
  return function(dispatch) {
    const searchParams = new URLSearchParams(location.search);
    let tags = searchParams.getAll("tags");
    searchParams.delete("tags");
    tags.forEach(tag => {
      if (tag === removeTag) {
        return;
      }
      searchParams.append("tags", tag);
    });
    location.search = searchParams.toString();
    dispatch(push(location));
    tags = searchParams.getAll("tags");
    dispatch(setFilterTags(tags));
  };
}

/**
 * Navigates the the blog post list page & filters by the selected tag
 */

export function showFilteredBlogPosts(tag) {
  return function(dispatch) {
    dispatch(push(`/?tags=${tag}`));
  };
}

/**
 * Selectors
 */

/**
 * @param {State} state Redux state object
 * @returns {Array<BlogPosts>} List of blogposts sorted by creation date from latest to earliest
 */
const getBlogPostsByID = state => state.blog.byId;
export const getBlogPostsSortedByCreatedByDate = createSelector(
  [getBlogPostsByID],
  byID => {
    return Object.keys(byID)
      .map(id => {
        return byID[id];
      })
      .sort((o1, o2) => {
        const d1 = new Date(o1.created_on);
        const d2 = new Date(o2.created_on);
        // Latest to earliest
        return d2 - d1;
      });
  }
);

export function getFilteredAndSortedBlogPosts(state) {
  let blogposts = getBlogPostsSortedByCreatedByDate(state);
  const filterTags = getFilterTags(state);

  if (!filterTags.length) {
    return blogposts;
  }
  // Filter by Tag
  return blogposts.filter(blogpost => {
    if (!blogpost.tags) {
      return false;
    }

    const blogpostTags = blogpost.tags.map(tag => {
      return tag.name;
    });
    return filterTags.every(filterTag => {
      return blogpostTags.includes(filterTag);
    });
  });
}

export function getFilterTags(state) {
  return state.blog.filterTags || [];
}
