import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import ErrorDisplay from './index';

configure({adapter: new Adapter()});


describe('tests the error component', () => {
    test('shall render the error display without error', () => {
        const wrapper = shallow(<ErrorDisplay/>);
        expect(wrapper).toMatchSnapshot();
    });
})
