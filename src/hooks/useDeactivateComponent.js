import { useState, useEffect, useRef } from 'react';

export default initialState => {
    const [isActive, setIsActive] = useState(initialState);
    const ref = useRef(null);

    const onClick = event => {
        if (!ref.current) {
            return;
        }
        if (ref.current.contains(event.target)) {
            setIsActive(v => !v);
        } else {
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    });

    return [ref, isActive];
};
