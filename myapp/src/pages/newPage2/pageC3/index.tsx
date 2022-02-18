import { useEffect } from 'react';
import { useModel, useRequest } from 'umi';
// import Mock from 'mockjs'
import './index.less';

function getUsername(): Promise<string> {
    return new Promise((resolve) => {
        // setTimeout(() => {
        return '看看';
        // }, 1000);
    });
}

export default (): React.ReactNode => {
    const { counter } = useModel('counter')
    const { data, error, loading } = useRequest(getUsername);

    useEffect(() => {
        console.log(data, error, loading)
    }, [data])

    return (
        <section className='title'>
            <h1>New Page2-C2--{counter}</h1>
            <h2>{data}</h2>
        </section>
    )
};