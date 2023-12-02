/* eslint-disable react/prop-types */

import { Suspense } from 'react';
import classNames from '../utils/classNames';
import Loading from './Loading';

const Layout = ({ children }) => {
  return (
    <div className={classNames(
      'flex flex-col flex-1',
    )}>
      <main className="flex-1 bg-gray-50 min-h-screen">
        <Suspense fallback={<Loading />} >
          {children}
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
