interface IRoute {
  params: {
    listId: string;
  }
}

interface INavigation {
  reset: Function;
  goBack: Function;
  navigate: Function;
  setOptions: Function;
  addListener: Function;
}

export {
  IRoute,
  INavigation,
};
