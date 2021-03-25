import React, {useEffect} from 'react';
import styles from './index.css';

const BasicLayout: React.FC = props => {

  useEffect(() => {
    console.log('layouts', process.env.REACT_APP_ENV)
  })
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!--</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
