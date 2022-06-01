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
      name: 'Bored Ape #0003',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      price: 100,
      url: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg',
      available: true,
    },
    {
      name: 'Adidas Ape #0004',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      price: 10,
      url: 'https://www.ledgerinsights.com/wp-content/uploads/2021/12/adidas-nft-bored-ape.jpg',
      available: true,
    },
    {
      name: 'Bored Wukong #0005',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      price: 19,
      url: 'https://1734811051.rsc.cdn77.org/data/images/full/400671/bored-wukong-nft-creator-denies-accusation-about-its-strong-resemblance-to-bored-ape-yacht-club.jpg',
      available: true,
    }
  );

  console.log('Items created');
};

module.exports = populate;
