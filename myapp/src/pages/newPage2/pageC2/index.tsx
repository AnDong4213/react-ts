import React from 'react';
import { useModel } from 'umi';
import './index.less';

export default (): React.ReactNode => {
    const { counter } = useModel('counter')

    return (
        <div className='title'>
            <p>New Page2-C2--{counter}</p>
        </div>
    )
};