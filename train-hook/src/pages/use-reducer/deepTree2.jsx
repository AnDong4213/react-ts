import React, { useContext } from 'react'
import { ReducerContext } from './context'

export default function DeepTree2() {
    const dispatch = useContext(ReducerContext);

    const handleClick = () => {
        dispatch({ type: 'add', payload: { id: (Math.random() * 10000).toFixed(4), text: (Math.random() * 10000).toFixed(2) } })
    }

    return (
        <section>
            <h3 onClick={handleClick}>deepTree2</h3>
        </section>
    )
}
