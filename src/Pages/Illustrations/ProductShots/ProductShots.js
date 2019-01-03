import React from 'react';
import Page from '../../../Components/Page/Page';

class ProductShots extends React.Component {
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
          {'This is the product shots page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default ProductShots;
