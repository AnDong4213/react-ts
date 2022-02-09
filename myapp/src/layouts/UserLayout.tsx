import React from 'react'
import './UserLayout.less'

const UserLayout: React.FC = (props: any) => {
    const { children } = props

    return (
        <section>
            <div className='title'>登录页面</div>
            {children}
        </section>
    )
}

export default UserLayout