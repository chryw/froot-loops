import React from 'react';
import axios from 'axios';
import Page from '../../../Components/Page/Page';

class VsFluent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    // GET request for remote image
    axios({
      method: 'get',
      headers: {
        'X-Figma-Token': process.env.REACT_APP_FIGMAKEY,
      },
      url: 'https://api.figma.com/v1/files/GzJ3fuqSE49GKT31ssOr7VZ8/?ids=1:3A623',
    })
      .then((response) => {
        this.setState({
          data: response.data.document,
        });
      });
  }

  render() {
    const { data } = this.state;
    const pages = data.children;
    console.log(pages);
    return (
      <Page
        title="Visual Studio Fluent icons"
      >
        <h1>
          {'This is the Visual Studio Fluent icons page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default VsFluent;
