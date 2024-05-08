import React from 'react';
import Header from './Header';
import Menu from './Menu';

const MasterLayout = ({children, ...props}) => {
    return (
        <div {...props}>
            <Header/>
            {children}
            <Menu/>
        </div>
    );
};

export default MasterLayout;