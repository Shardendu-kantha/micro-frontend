import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
       const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({ pathname: nextPathname }) => {
                // pathname is propery inside location object being passed by marketing navigation
                // update current path of container's browser history object
                // update this only if current path and next path name are differernt
                const { pathname } = history.location;

                if(pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });

        history.listen(onParentNavigate);
    }, []); // should run only once
    return <div ref={ref} />
};
