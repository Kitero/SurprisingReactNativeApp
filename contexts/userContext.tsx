import React, { useState } from 'react';

const UserContext = React.createContext({
    token: '',
    setToken: (value) => { }
});

export {
    UserContext
}