import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        mount(ref.current, {
            onNavigate: ({ pathname: nextPathname }) => {
                // pathname is propery inside location object being passed by marketing navigation
                // update current path of container's browser history object

                history.push(nextPathname);
            }
        });
    });

    return <div ref={ref} />
};
