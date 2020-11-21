interface IListItem {
  checked: boolean;
  name: string;
  id: number;
  item: string;
}

interface IItem {
  name: string;
  id: string;
}

interface IList {
  name: string;
  id: string;
}

interface IUser {
  token: string;
}

export {
  IListItem,
  IItem,
  IList,
  IUser,
};
