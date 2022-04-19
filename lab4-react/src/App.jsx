import { Container, Button } from 'react-bootstrap';
import ItemsTable from './components/ItemsTable';
import { useItems } from './hooks/useItems';

function App() {
  const {
    items,
    addItem,
    handlers,
    searchValue,
    setSearchValue,
    sortBy,
    changeSortingColumn,
  } = useItems();

  return (
    <div className='app'>
      <Container>
        <h1>Items manager</h1>
        <input
          value={searchValue}
          placeholder='Search...'
          onChange={(e) => {
            e.preventDefault();
            setSearchValue(e.target.value);
          }}
        />
        <ItemsTable
          items={items}
          searchValue={searchValue}
          sortBy={sortBy}
          changeSortingColumn={changeSortingColumn}
          handlers={handlers}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            addItem();
          }}
        >
          Add item
        </Button>
      </Container>
    </div>
  );
}

export default App;
