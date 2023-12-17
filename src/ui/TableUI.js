import React from "react";

const TableUI = (props) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {props.headers &&
              props.headers.map((head) => <th key={head}>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.contents.map(
            (content) =>
              content && (
                <tr key={content.key}>
                  {props.headers.map((head) => (
                    <td key={head}>{content[head] || "-"}</td>
                  ))}
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUI;
