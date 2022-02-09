import React from 'react'
import { useModel } from 'umi'
import './UserLayout.less'

const UserLayout: React.FC = (props: any) => {
    const { children } = props
    const { initialState } = useModel('@@initialState')
    console.log(initialState)

    return (
        <section>
            <div className='title'>登录页面</div>
            <div className='title'>{initialState?.userName2}</div>
            {children}
        </section>
    )
}

export default UserLayout