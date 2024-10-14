import React, { createContext, useContext, } from 'react';
export const AdminContext = createContext();

export const AdminProvider = (props) => {


    return (
        <AdminContext.Provider value={{
            
        }}>
            {props.children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
