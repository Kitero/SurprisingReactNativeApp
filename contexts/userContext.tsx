import React from 'react';

interface IUserContext {
  token: string;
  setToken: Function;
}

const UserContext = React.createContext({
  token: '',
  setToken: () => { },
});

export {
  IUserContext,
  UserContext,
};
