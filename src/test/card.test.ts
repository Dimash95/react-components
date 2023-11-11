// import { mount, describe, it, expect } from 'vitest';
// import Card from '../components/card';

// const mockAnimeItems = [
//   {
//     title: 'Anime 1',
//     image: 'image1.jpg',
//     largeImage: 'largeImage1.jpg',
//     synopsis: 'Synopsis 1',
//     id: 1,
//   },
//   {
//     title: 'Anime 2',
//     image: 'image2.jpg',
//     largeImage: 'largeImage2.jpg',
//     synopsis: 'Synopsis 2',
//     id: 2,
//   },
// ];

// describe('Card component', () => {
//   it('renders the specified number of cards', () => {
//     const wrapper = mount(Card, {
//       props: {
//         showAnimeById: () => {},
//       },
//       context: {
//         searchedAnimeItems: mockAnimeItems,
//       },
//     });

//     const cards = wrapper.find('.card');
//     expect(cards.length).toBe(mockAnimeItems.length);
//   });

//   it('displays an appropriate message if no cards are present', () => {
//     const wrapper = mount(Card, {
//       props: {
//         showAnimeById: () => {},
//       },
//       context: {
//         searchedAnimeItems: [],
//       },
//     });

//     const message = wrapper.find('.no-cards-message');
//     expect(message.text()).toBe('No cards available.');
//   });
// });
