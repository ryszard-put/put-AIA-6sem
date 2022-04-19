import { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

import PlaceholderImage from '../assets/images/placeholder.jpg';

const Item = ({ data, handlers }) => {
  const [imageInput, setImageInput] = useState(false);
  const { id, name, description, image, rating } = data;
  const {
    changeName,
    changeDescription,
    changeRating,
    deleteItem,
    changeImage,
  } = handlers;

  const handler = (e, cb, ...cbProps) => {
    e.preventDefault();
    cb(...cbProps);
  };

  return (
    <tr>
      <td className='align-middle text-center'>{id}</td>
      <td className='align-middle text-center' style={{ width: '250px' }}>
        <input
          style={{ width: '100%' }}
          value={name}
          onChange={(e) => handler(e, changeName, id, e.target.value)}
        />
      </td>
      <td className='align-middle text-center'>
        <textarea
          style={{ width: '100%', height: '200px', resize: 'none' }}
          value={description}
          onChange={(e) => handler(e, changeDescription, id, e.target.value)}
        />
      </td>
      <td className='align-middle text-center'>
        {imageInput ? (
          <>
            <input
              style={{ width: '100%' }}
              value={image}
              onChange={(e) => handler(e, changeImage, id, e.target.value)}
            />
            <Button onClick={() => setImageInput(false)}>Confirm</Button>
          </>
        ) : (
          <Image
            style={{ cursor: 'pointer' }}
            onClick={() => setImageInput(true)}
            src={image || PlaceholderImage}
            alt='Alt'
            width={200}
          />
        )}
      </td>
      <td className='align-middle text-center' style={{ width: '100px' }}>
        <Form.Select
          value={rating}
          onChange={(e) => handler(e, changeRating, id, +e.target.value)}
        >
          <option value='2'>2</option>
          <option value='2.5'>2.5</option>
          <option value='3'>3</option>
          <option value='3.5'>3.5</option>
          <option value='4'>4</option>
          <option value='4.5'>4.5</option>
          <option value='5'>5</option>
        </Form.Select>
      </td>
      <td className='align-middle text-center' style={{ width: '50px' }}>
        <Button
          className='btn-block'
          variant='danger'
          onClick={(e) => {
            e.preventDefault();
            deleteItem(id);
          }}
        >
          X
        </Button>
      </td>
    </tr>
  );
};

export default Item;
