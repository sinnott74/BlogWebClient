export default [
  {
    path: "/todo",
    loader: () =>
      import(/* webpackChunkName: "TodoPage" */ "todo/pages/TodoPage"),
    exact: true,
    authenticated: true
  }
];
