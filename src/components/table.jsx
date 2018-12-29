import React from "react";

const Table = props => {
  const { items, orderPlaced } = props;
  const renderItemRow = () => {
    return (
      <React.Fragment>
        {items.map(item => (
          <tr key={item.id}>
            <td>
              <input type="checkbox" checked={item.selected} disabled={orderPlaced} onChange={(event) => props.handleItemSelect(event, item)} />
            </td>
            <td> {item.itemName} </td>
            <td> {item.price} </td>
            <td> {item.weight} </td>
          </tr>
        ))}
      </React.Fragment>
    );
  };
  return (
    <table className="table table-striped table-sm mt-5">
      <thead>
        <tr>
          <th />
          <th> Item </th>
          <th> Price($) </th>
          <th> Weight(g) </th>
        </tr>
      </thead>
      <tbody>{items.length ? renderItemRow(items) : null}</tbody>
    </table>
  );
};
export default Table;
