import React from 'react';

interface IUserContext {
  token: string;
  setToken: Function;
  profileImageUrl: string;
  setProfileImageUrl: Function;
}

const UserContext = React.createContext({
  token: '',
  setToken: () => { },
  profileImageUrl: '',
  setProfileImageUrl: () => { },
});

export {
  IUserContext,
  UserContext,
};
