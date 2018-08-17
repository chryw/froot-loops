import React from 'react';
import { Route } from 'react-router-dom';
import Page from '../../Components/Page/Page';
import Vs2017 from './Vs2017/Vs2017';

const Icons = () => (
  <Page
    title="Icons"
    intro={(
      <p>
        {'This is icons page.'}
      </p>
    )}
    navItems={[
      {
        name: 'VS 2017',
        url: '/icons/vs2017',
      },
      {
        name: 'Fluent',
        url: 'icons/fluent',
      },
    ]}
  >
    <Route path="/icons/vs2017" component={Vs2017} />
    <Route path="/icons/fluent" component={Vs2017} />
  </Page>
);

export default Icons;
