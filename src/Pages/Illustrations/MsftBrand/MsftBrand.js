import React from 'react';
import Page from '../../../Components/Page/Page';

class MsftBrand extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Page
        title="Microsoft Brand Central style illustrations"
      >
        <h1>
          {'This is the Microsoft illustrations page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default MsftBrand;
