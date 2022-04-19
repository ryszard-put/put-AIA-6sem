import { Table } from 'react-bootstrap';
import Item from './Item';

const fields = ['Id', 'Name', 'Description', 'Image', 'Rating'];

const TableHead = ({ sortBy, changeSortingColumn }) => {
  const [sortField, order] = sortBy.split('-');
  return (
    <thead>
      <tr>
        {fields.map((field) => (
          <th
            style={field !== 'Image' ? { cursor: 'pointer' } : {}}
            key={field}
            className='text-center'
            onClick={
              field !== 'Image'
                ? (_) => changeSortingColumn(field.toLowerCase())
                : null
            }
          >
            {field}{' '}
            {field.toLowerCase() === sortField
              ? order === 'asc'
                ? '\u2191'
                : '\u2193'
              : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const ItemsTable = ({
  items,
  handlers,
  searchValue,
  sortBy,
  changeSortingColumn,
}) => {
  const sortFunc = (a, z) => {
    const [field, order] = sortBy.split('-');
    console.log(typeof a[field]);
    if (typeof a[field] === 'number') {
      return order === 'asc' ? a[field] - z[field] : z[field] - a[field];
    } else if (typeof a[field] === 'string')
      if (order === 'asc') return a[field] > z[field] ? 1 : -1;
      else return z[field] > a[field] ? 1 : -1;
  };
  return (
    <Table striped bordered hover>
      <TableHead sortBy={sortBy} changeSortingColumn={changeSortingColumn} />
      <tbody>
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .sort(sortFunc)
          .map((item) => (
            <Item key={item.id} data={item} handlers={handlers} />
          ))}
      </tbody>
    </Table>
  );
};

export default ItemsTable;
