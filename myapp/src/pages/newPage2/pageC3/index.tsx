import { useModel } from 'umi';
import React, { useState } from 'react';
import { TreeSelect } from 'antd';

import { useBoolean, useRequest } from 'ahooks';
import Mock from 'mockjs';

import './index.less';

const { TreeNode } = TreeSelect;

async function getArticle(): Promise<{ data: string; time: number }> {
  console.log('cacheKey');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime(),
      });
    }, 1000);
  });
}

const Article = () => {
  const { data, loading } = useRequest(getArticle, {
    cacheKey: 'cacheKey-demo',
  });
  if (!data && loading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <p>Background loading: {loading ? 'true' : 'false'}</p>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </>
  );
};

export default (): React.ReactNode => {
  const { counter, setCounter } = useModel('counter');
  const [value, setValue] = useState(undefined);
  const [state, { toggle }] = useBoolean();

  const onChange = () => {
    setValue(value);
  };

  const handleToggle = () => {
    toggle();
    setCounter((c) => c + 1);
  };

  return (
    <section className="title">
      <h1>New Page2-C2--{counter}</h1>
      <TreeSelect
        showSearch
        style={{ width: '50%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
      >
        <TreeNode value="parent 1" title="parent 1">
          <TreeNode value="parent 1-0" title="parent 1-0">
            <TreeNode value="leaf1" title="leaf1" />
            <TreeNode value="leaf2" title="leaf2" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1">
            <TreeNode value="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
          </TreeNode>
        </TreeNode>
      </TreeSelect>

      <div>
        <button type="button" onClick={handleToggle}>
          show/hidden
        </button>
        {state && <Article />}
      </div>
    </section>
  );
};
