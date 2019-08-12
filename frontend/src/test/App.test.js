import React from 'react';
import Projects from '../components/Projects';
import {shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

let wrapper;
let instance;
beforeEach(() => {
    wrapper = shallow(<Projects />);
    instance = wrapper.instance();
});

describe('Testing month string', () => {
    it('Getting correct month string', () => {
        var jan = 0;
        expect(instance.monthString(jan)).toBe("Jan");
    });
    
    it('Getting month not in range', () => {
        var invalid = 12;
        expect(instance.monthString(invalid)).toBeUndefined();
    });
})

