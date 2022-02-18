import React, { useEffect, useState } from 'react';
import { message, InputNumber } from 'antd';
import { useModel, useRequest } from 'umi'
// import { useRequest } from 'ahooks'
import { getCatLists, catType, getDogLists } from './service'
import styles from './index.less';

export default (): React.ReactNode => {
    const [catList, setCatList] = useState<catType[]>([])
    const [catList2, setCatList2] = useState<any>([])
    const [num, setNum] = useState<number>(1)
    const message2 = useModel('demo')
    const { initialState } = useModel('@@initialState')

    // const { data } = useRequest(getNotices);
    const { data, loading, run, refresh } = useRequest(() => {
        return getCatLists({
            params: {
                limit: num
            }
        })
    }, {
        // pollingInterval: 5000,
        // pollingWhenHidden: false,
        manual: true,
        onSuccess: (result, params) => {
            console.log(result, params)
        },
    });

    // 通过 run(number) 来加载数据，通过 onSuccess 和 onError 来处理成功和失败。
    const { loading: loading2, run: run2, data: data2 } = useRequest(getDogLists, {
        manual: true,
        onSuccess: (result, params) => {
            console.log(result)
            console.log(params)
        },
        onError: (error) => {
            message.error(error.message);
        },
    })

    const { add, minus } = useModel('counter', (ret: any) => {
        return {
            add: ret.increment,
            minus: ret.decrement
        }
    })

    useEffect(() => {
        // console.log(data, loading)
        setCatList(data ?? [])
    }, [data])

    useEffect(() => {
        console.log(data2)
        setCatList2(data2 || [])
    }, [data2])

    const contentStyle = {
        height: '60px',
        color: '#fff',
        lineHeight: '60px',
        background: '#364d79',
        display: 'inline-block'
    };

    const loadCatData = async (n: number) => {
        run2(n)

        // runAsync  3.x版本才有
        /*  try {
             await runAsync(n);
         } catch (error: any) {
             message.error(error.message);
         } */
    }

    const onNumberChange = (value: number) => {
        setNum(value)
    }

    return (
        <section className={styles.title}>
            <p>New Page1-{initialState?.userName2}</p>
            <button onClick={add}>add by 1</button>
            <button onClick={minus}>minus by 1</button>
            <p>{message2}</p>
            <div style={{ display: 'flex' }}>
                <InputNumber min={1} max={10} defaultValue={1} onChange={onNumberChange} />
                <p style={{ cursor: 'pointer', margin: '0px 10px' }} onClick={run}>加载数据</p>
                <p style={{ cursor: 'pointer' }} onClick={refresh}>刷新数据</p>
            </div>

            <h5>{loading ? '加载中...' : '加载完成'}</h5>

            <div className={styles.catflex}>
                {
                    catList.length > 0 && catList.map((item: any) => (
                        <div key={item.id}>
                            <img style={contentStyle} src={item.url} alt={item.id} />
                        </div>
                    ))
                }
                {
                    catList2.length > 0 && catList2.map((item: any) => (
                        <div key={item.id}>
                            <img style={contentStyle} src={item.url} alt={item.id} />
                        </div>
                    ))
                }
            </div>

            <div>
                <button disabled={loading2} type="button" onClick={() => loadCatData(num)}>
                    {loading2 ? 'Loading' : 'Edit'}
                </button>
            </div>

        </section>
    )
};