import React from 'react';

const MasterLayout = ({ children, ...props }) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default MasterLayout;