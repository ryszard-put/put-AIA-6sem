import {v4 as uuid} from 'uuid'

(() => {
  const addButton = document.querySelector("#add_book");
  const tableBody = document.querySelector('table > tbody');

  const STATE = {
    books: [],
  }

  // setState(oldState => newState)
  // const setState = (cb) => {
  //   STATE = {...cb(STATE)}
  //   renderState()
  // }

  const renderState = () => {
    const children = []
    STATE.books.forEach(({author, title, editMode, id}) => {
      const tableRow = document.createElement('tr');
      tableRow.id = id;

      const authorCol = document.createElement("td");
      const titleCol = document.createElement("td");

      const saveCol = document.createElement("td");
      const removeCol = document.createElement("td");

      const removeButton = document.createElement('button');

      if(editMode) {
        const titleInput = document.createElement('input')
        const authorInput = document.createElement('input')
        // console.log(document.querySelector(`#${id} td:nth-child(1) span`))
        authorInput.value = document.querySelector(`#${id} td:nth-child(1) input`)?.value ?? author;
        titleInput.value = document.querySelector(`#${id} td:nth-child(2) input`)?.value ?? title;
        titleCol.appendChild(titleInput)
        authorCol.appendChild(authorInput)

        const saveButton = document.createElement("button");
        saveButton.innerText = 'Save';
        saveCol.appendChild(saveButton)

        saveButton.addEventListener('click', e => {
          e.preventDefault()
          STATE.books.find((book) => book.id == id).author = authorInput.value;
          STATE.books.find((book) => book.id == id).title = titleInput.value;
          STATE.books.find((book) => book.id == id).editMode = false;
  
          renderState();
        })
      }
      else {
        const titleSpan = document.createElement('span')
        const authorSpan = document.createElement('span')
        authorSpan.innerText = author;
        titleSpan.innerText = title;
        titleCol.appendChild(titleSpan);
        authorCol.appendChild(authorSpan);

        const editButton = document.createElement("button");
        editButton.innerText = 'Edit';
        saveCol.appendChild(editButton)

        editButton.addEventListener('click', e => {
          e.preventDefault()
          STATE.books.find((book) => book.id == id).editMode = true;
  
          renderState();
        })
      }
      
      removeButton.innerText = 'Remove';

      removeButton.addEventListener('click', e => {
        e.preventDefault()
        STATE.books = [...STATE.books.filter((book) => book.id !== id)];
        renderState()
      })

      removeCol.appendChild(removeButton);
      tableRow.appendChild(authorCol)
      tableRow.appendChild(titleCol)
      tableRow.appendChild(saveCol)
      tableRow.appendChild(removeCol);

      children.push(tableRow);

    })
    
    tableBody.innerHTML = null;

    children.forEach(child => tableBody.appendChild(child));
  }

  const addNewBook = (e) => {
    e.preventDefault();
    STATE.books.push({
      id: "id-" + uuid(),
      author: '',
      title: '',
      editMode: true
    })

    renderState();
  }

  addButton.addEventListener('click', addNewBook)

})()