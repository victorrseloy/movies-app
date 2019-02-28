import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure ,mount} from 'enzyme';
import MoviersBannerContainer from './index';
import MovieBanner from 'components/Presentational/MovieBanner'

configure({adapter: new Adapter()});

const movies = [
    {
        Title: 'The Matrix',
        Year: '1999',
        imdbID: 'tt0133093',
        Type: 'movie',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    },
    {
        Title: 'The Matrix Reloaded',
        Year: '2003',
        imdbID: 'tt0234215',
        Type: 'movie',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    },
    {
        Title: 'The Matrix Revolutions',
        Year: '2003',
        imdbID: 'tt0242653',
        Type: 'movie',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
];

describe('tests the movies banner container', () => {
    test('shall render the error display without error', () => {
        const wrapper = shallow(<MoviersBannerContainer/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('check children', () => {
        const wrapper = mount(<MoviersBannerContainer movies={movies} />);
        expect(wrapper.find(MovieBanner)).toHaveLength(movies.length);
    });
    
})
