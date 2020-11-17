import React, { useState } from 'react';

const UserContext = React.createContext({
    token: null,
    setToken: (token) => { this.token = token }
});

export {
    UserContext
}