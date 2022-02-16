import { useEffect } from 'react';
import { useModel } from 'umi';
import './index.less';

export default (): React.ReactNode => {
    const { counter } = useModel('counter')

    useEffect(() => {
        console.log('')
    }, [])

    return (
        <section className='title'>
            <h1>New Page2-C2--{counter}</h1>
        </section>
    )
};