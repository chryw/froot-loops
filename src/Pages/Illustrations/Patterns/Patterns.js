import React from 'react';
import Page from '../../../Components/Page/Page';

class Patterns extends React.Component {
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
          {'This is the Background patterns and texutres page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default Patterns;
