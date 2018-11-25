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
        title="Microsoft and 1st party brands"
      >
        <h1>
          {'This is the Microsoft and 1st party brands. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default Microsoft;
