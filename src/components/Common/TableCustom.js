import React from 'react';

export default function TableCustom({ children, ...props }) {
  return (
    <div className="data-table">
      <div className="data-table-title" style={props.style}>
        <div className="title">{props.title}</div>
      </div>
      <div className="data-table-container">{children}</div>
    </div>
  );
}
