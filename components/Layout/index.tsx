import * as React from 'react';
import Body from './Body';
import Header from './Header';

export interface ILayoutProps {}

const Layout: React.FC<ILayoutProps> = (props) => {
  return (
    <div>
      <Header />
      <Body>{props.children}</Body>
    </div>
  );
};
export default Layout;
