export default [
  {
    path: "/code",
    loader: () =>
      import(/* webpackChunkName: "ListCodePage" */ "code/pages/CodeListPage"),
    exact: true
  }
];
