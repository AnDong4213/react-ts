import React, { useContext } from 'react'
import { ReducerContext } from './context'
import DeepTree2 from './deepTree2'

export default function DeepTree(props) {
    const dispatch = useContext(ReducerContext);

    const handleClick = () => {
        dispatch({ type: 'add', payload: { id: (Math.random() * 10000).toFixed(4), text: (Math.random() * 10000).toFixed(2) } })
    }

    return (
        <section>
            <h3 onClick={handleClick}>deepTree</h3>
            {
                props.todos.map((num, idx) =>
                    <div key={num.id}>
                        <span>{num.text}</span>
                    </div>)
            }
            <div>
                <DeepTree2 />
            </div>
        </section>
    )
}
