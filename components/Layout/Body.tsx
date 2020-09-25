import React from 'react';

const Body: React.FC = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '16px'
      }}
    >
      {props.children}
    </div>
  );
};

export default Body;
