import { useState, useEffect } from 'react';

function useLocalStorage(key) {
    const [storedValue, setStoredValue] = useState(() => {
        return localStorage.getItem(key);
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(localStorage.getItem(key));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    const setValue = (value) => {
        localStorage.setItem(key, value);
        setStoredValue(value);
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
