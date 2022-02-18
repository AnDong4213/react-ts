import { useRef, useEffect } from 'react';
import { PlusOutlined, EllipsisOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { useModel } from 'umi';

import type { ProColumns, ActionType } from '@ant-design/pro-table';
import './index.less';

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
}

const columns: ProColumns<GithubIssueItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '标题',
        dataIndex: 'title',
        copyable: true,
        ellipsis: true,
        tip: '标题过长会自动收缩',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
    },
    {
        title: '状态',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
                disabled: true,
            },
            processing: {
                text: '解决中',
                status: 'Processing',
            },
        },
    },
    {
        title: '标签',
        dataIndex: 'labels',
        search: false,
        renderFormItem: (_, { defaultRender }) => {
            console.log('defaultRender', _)
            return defaultRender(_);
        },
        render: (_, record) => (
            <Space>
                {record.labels.map(({ name, color }) => (
                    <Tag color={color} key={name}>
                        {name}
                    </Tag>
                ))}
            </Space>
        ),
    },
    {
        title: '创建时间',
        key: 'showTime',
        dataIndex: 'created_at',
        valueType: 'dateTime',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: '创建时间',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                编辑
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                查看
            </a>,
            <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                    { key: 'copy', name: '复制' },
                    { key: 'delete', name: '删除' },
                ]}
            />,
        ],
    },
]

const menu = (
    <Menu>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
);

export default (): React.ReactNode => {
    const { counter } = useModel('counter')
    const actionRef = useRef<ActionType>()

    useEffect(() => {
        console.log(actionRef.current)
    }, [])

    return (
        <section className='title'>
            <title>New Page2-C2--{counter}</title>

            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                params={{ title: 'BUG-2', startTime: "2022-01-01" }}
                request={async (params = {}, sort, filter) => {
                    console.log(params, sort, filter);
                    return request<{
                        data: GithubIssueItem[];
                    }>('https://proapi.azurewebsites.net/github/issues', {
                        params,
                    });
                }}
                postData={(data: GithubIssueItem[]) => {
                    data = data.map(item => ({ ...item, sex: 'female', labels: [...item.labels, ...[{ name: '看看', color: 'success' }]] }))
                    return data
                }}
                onLoad={(data: GithubIssueItem[]) => {
                    console.log('data, ', data)
                }}
                // table 工具栏，设为 false 时不显示
                // options={false}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                }}
                // rowKey="id"
                search={{
                    labelWidth: 'auto',
                    searchText: '查询ing'
                }}
                form={{
                    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        console.log('values, type', values, type)
                        if (type === 'get') {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                pagination={{
                    pageSize: 5,
                }}
                dateFormatter="string"
                headerTitle="高级表格3"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary">
                        新建
                    </Button>,
                    <Dropdown key="menu" overlay={menu}>
                        <Button>
                            <EllipsisOutlined />
                        </Button>
                    </Dropdown>,
                    <GithubOutlined />
                ]}
            >
            </ProTable>
        </section>
    )
};