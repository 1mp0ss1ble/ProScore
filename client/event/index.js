import reducers from './reducer';
import componentsInner from './components';

export const components = componentsInner;

export default { ...reducers, components: componentsInner };
