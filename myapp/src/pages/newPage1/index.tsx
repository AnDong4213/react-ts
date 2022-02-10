import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { useModel, useRequest } from 'umi'
import { getCatLists, catType } from './service'
import styles from './index.less';

export default (): React.ReactNode => {
    const [catList, setCatList] = useState<catType[]>([])
    const message = useModel('demo')
    const { initialState } = useModel('@@initialState')
    // const { data } = useRequest(getNotices);
    const { data, error, loading } = useRequest(() => {
        return getCatLists({
            params: {
                limit: 1
            }
        })
    }, {
        // pollingInterval: 5000,
        // pollingWhenHidden: false,
    });

    const { add, minus } = useModel('counter', (ret: any) => {
        return {
            add: ret.increment,
            minus: ret.decrement
        }
    })

    useEffect(() => {
        console.log(data, error, loading)
        setCatList(data ?? [])
    }, [data])

    const contentStyle = {
        height: '60px',
        color: '#fff',
        lineHeight: '60px',
        background: '#364d79',
        display: 'inline-block'
    };

    return (
        <div className={styles.title}>
            <p>New Page1-{initialState?.userName2}</p>
            <button onClick={add}>add by 1</button>
            <button onClick={minus}>minus by 1</button>
            <p>{message}</p>
            <h5>{loading ? '加载中...' : '加载完成'}</h5>
            <Carousel autoplay>
                {
                    catList.length > 0 && catList.map((item) => (
                        <div key={item.id}>
                            <img style={contentStyle} src={item.url} alt="" />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
};