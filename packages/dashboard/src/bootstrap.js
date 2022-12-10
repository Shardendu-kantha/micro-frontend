import { createApp } from 'vue';
import DashBoard from './components/Dashboard.vue';

// Mount function to start up the app
const mount = (el) => {
    const app = createApp(DashBoard);
    app.mount(el); // this mount is vue's mount function
}

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root');
    
    if(devRoot) {
        mount(devRoot);
    }
}

// We are running throguh container
// and we should export mount function

export { mount }