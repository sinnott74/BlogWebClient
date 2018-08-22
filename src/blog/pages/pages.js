export default [
  {
    path: "/",
    loader: () =>
      import(/* webpackChunkName: "ListBlogPostPage" */ "./ListBlogPostPage"),
    exact: true
  },
  {
    path: "/blog/new",
    loader: () =>
      import(/* webpackChunkName: "AddBlogPostPage" */ "./AddBlogPostPage"),
    exact: true,
    authenticated: true
  },
  {
    path: "/blog/:id/edit",
    loader: () =>
      import(/* webpackChunkName: "EditBlogPostPage" */ "./EditBlogPostPage"),
    exact: true,
    authenticated: true
  },
  {
    path: "/blog/:id",
    loader: () =>
      import(/* webpackChunkName: "ViewBlogPostPage" */ "./ViewBlogPostPage"),
    exact: true
  },
  {
    path: "/blog/:id/delete",
    loader: () =>
      import(/* webpackChunkName: "DeleteBlogPostPage" */ "./DeleteBlogPostPage"),
    exact: true,
    authenticated: true
  }
];
