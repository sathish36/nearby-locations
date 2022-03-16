import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
global.config = { baseUrl: 'http://localhost:9000', dmsUrl: 'http://localhost:9000' };
