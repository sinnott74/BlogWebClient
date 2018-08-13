export default [
  {
    path: "/",
    loader: () =>
      import(/* webpackChunkName: "ListBlogPostPage" */ "blog/pages/ListBlogPostPage"),
    exact: true
  },
  {
    path: "/blog/new",
    loader: () =>
      import(/* webpackChunkName: "AddBlogPostPage" */ "blog/pages/AddBlogPostPage"),
    exact: true,
    authenticated: true
  },
  {
    path: "/blog/:id/edit",
    loader: () =>
      import(/* webpackChunkName: "EditBlogPostPage" */ "blog/pages/EditBlogPostPage"),
    exact: true,
    authenticated: true
  },
  {
    path: "/blog/:id",
    loader: () =>
      import(/* webpackChunkName: "ViewBlogPostPage" */ "blog/pages/ViewBlogPostPage"),
    exact: true
  },
  {
    path: "/blog/:id/delete",
    loader: () =>
      import(/* webpackChunkName: "DeleteBlogPostPage" */ "blog/pages/DeleteBlogPostPage"),
    exact: true,
    authenticated: true
  }
];
