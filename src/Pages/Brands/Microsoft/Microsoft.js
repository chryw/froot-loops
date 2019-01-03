import React from 'react';
import Page from '../../../Components/Page/Page';

class Microsoft extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Page
        {...this.props}
      >
        <h1>
          {'This is the Microsoft and 1st party brands. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default Microsoft;
