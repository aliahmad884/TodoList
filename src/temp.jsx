import React, { useRef, useEffect } from 'react';

function MyComponent() {
    // useRef returns a mutable object with a 'current' property
    const myRef = useRef("hello");

    useEffect(() => {
        // The value assigned to myRef.current can be accessed and modified
        console.log(myRef.current); // null initially

        // Assigning a value to the 'current' property
        myRef.current = 'Hello, useRef!';

        // Now, the value can be accessed outside the render function
        console.log(myRef.current); // 'Hello, useRef!'
    }, []); // The empty dependency array ensures this effect runs only once after the initial render

    return <div>My Component</div>;
}

export default MyComponent;