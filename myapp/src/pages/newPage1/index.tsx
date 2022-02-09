import React from 'react';
import { useModel } from 'umi'
import styles from './index.less';

export default (): React.ReactNode => {
    const message = useModel('demo')
    const { initialState } = useModel('@@initialState')

    const { add, minus } = useModel('counter', ret => {
        return {
            add: ret.increment,
            minus: ret.decrement
        }
    })

    return (
        <div className={styles.title}>
            <p>New Page1-{initialState?.userName2}</p>
            <button onClick={add}>add by 1</button>
            <button onClick={minus}>minus by 1</button>
            <p>{message}</p>
        </div>
    )
};