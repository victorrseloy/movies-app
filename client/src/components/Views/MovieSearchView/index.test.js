import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import {MovieSearchView} from './index';
import MoviesBannerContainer from 'components/Presentational/MoviesBannerContainer'
import ErrorDisplay from 'components/Presentational/ErrorDisplay'
configure({adapter: new Adapter()});

describe('Tests the movie view', () => {
    test('check if renders properly the movies banner', () => {
        const wrapper = shallow(<MovieSearchView movies={[{Title:'dummy',Poster:'dummy'}]} error={true} results={true} loading={false}/>);
        expect(wrapper.find(MoviesBannerContainer)).toHaveLength(1);
    });

    test('shall not renders banners cointainers when have 0 items', () => {
        const wrapper = shallow(<MovieSearchView movies={[{Title:'dummy',Poster:'dummy'}]} results={false} loading={false}/>);
        expect(wrapper.find(MoviesBannerContainer)).toHaveLength(0);
    });

    test('check if properly renders the error when we have errors', () => {
        const wrapper = shallow(<MovieSearchView movies={[{Title:'dummy',Poster:'dummy'}]} error={true} results={true} loading={false}/>);
        expect(wrapper.find(ErrorDisplay)).toHaveLength(1);
    });

    test('check if doesn not renders the error if no error is present', () => {
        const wrapper = shallow(<MovieSearchView movies={[{Title:'dummy',Poster:'dummy'}]} error={false} results={true} loading={false}/>);
        expect(wrapper.find(ErrorDisplay)).toHaveLength(0);
    });

    test('check if properly renders the loader when we are loading', () => {
        const wrapper = shallow(<MovieSearchView movies={[{Title:'dummy',Poster:'dummy'}]} error={false} results={true} loading={true}/>);
        expect(wrapper.find('img.loader-spinner')).toHaveLength(1);
    });

    test('check if does not renders the loader when we are not loading', () => {
        const wrapper = shallow(<MovieSearchView movies={[{Title:'dummy',Poster:'dummy'}]} error={false} results={true} loading={false}/>);
        expect(wrapper.find('img.loader-spinner')).toHaveLength(0);
    });

    test('check if class the onChange function when we type', () => {
        const mockOnChange = jest.fn()
        const wrapper = shallow(<MovieSearchView movies={[{Title:'dummy',Poster:'dummy'}]} onChange={mockOnChange} error={false} results={true} loading={false}/>);
        let searchBar = wrapper.find('input.search-bar');
        expect(searchBar).toHaveLength(1);
        let rndCalls = Math.floor(Math.random()*10)+1;

        for(let i = 0;i<rndCalls;i++){
            searchBar.simulate('change',{ target: { value: 'abcdefg'} });
        }

        expect(mockOnChange).toHaveBeenCalledTimes(rndCalls);
    });
});
