import React, { createContext, useContext, } from 'react';
export const ApiContext = createContext();

export const ApiProvider = (props) => {
    // const host = 'http://localhost:5000';
    const host = 'https://dashboard-backend-mauve.vercel.app';

    return (
        <ApiContext.Provider value={{
            host,
        }}>
            {props.children}
        </ApiContext.Provider>
    );
};

export const useApiContext = () => useContext(ApiContext);
