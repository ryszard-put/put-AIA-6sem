const { Item } = require('../models/Item');

const populate = async () => {
  await Item.deleteMany({});

  console.log('Items removed');

  await Item.create(
    {
      name: 'Politician M0nke #0001',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      price: 20,
      url: 'https://i.kym-cdn.com/photos/images/newsfeed/001/571/844/0a6.jpg',
      available: true,
    },
    {
      name: 'Politician M0nke Banana Phone #0002',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      price: 420,
      url: 'https://starecat.com/content/wp-content/uploads/putin-monkey-primitive-man-calling-with-a-banana.jpg',
      available: true,
    },
    {
      name: 'Mean Politician M0nke #0003',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      price: 100,
      url: 'https://i.kym-cdn.com/photos/images/newsfeed/001/571/844/0a6.jpg',
      available: true,
    },
    {
      name: 'Mean Politician M0nke #0004',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      price: 10,
      url: 'https://i.kym-cdn.com/photos/images/newsfeed/001/571/844/0a6.jpg',
      available: true,
    },
    {
      name: 'Mean Politician M0nke #0005',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      price: 19,
      url: 'https://i.kym-cdn.com/photos/images/newsfeed/001/571/844/0a6.jpg',
      available: true,
    }
  );

  console.log('Items created');
};

module.exports = populate;
