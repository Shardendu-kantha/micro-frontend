import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath], // this is useful in case of nested routes and it sets the initial path in marketing's memory histiry.
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App history={history} />, el);

    // some function should be returned to container
    // by this we can communicate down to marketing from container
    return {
        onParentNavigate({ pathname: nextPathname }) {
            // update current path of marketing's memory history object
            // update this only if current path and next path name are differernt
            const { pathname } = history.location;

            if(pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
}

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    
    // in isolation browser history should work rather than memory history
    if(devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory()});
    }
}

// We are running throguh container
// and we should export mount function

export { mount }