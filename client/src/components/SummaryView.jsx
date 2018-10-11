import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PieChart from './PieChart';


class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // comments: [],
    };
    // this.getAnalysis = this.getAnalysis.bind(this);
  }

  componentDidMount() {
  /* NOTE: need to pass url with correct endpoint
     down as a prop and use it as a var in the request */
  // this.getData();
    // this.getAnalysis();
    axios.post('api/gateway/org/sentiment', {
      text: 'Here\'s a summary of changes that I incorporated from the other two answers. First, I made the red dot render correctly. Then I drew in the lines by eyeballing where the screenMinX and screenMaxX are. You may want to use a more precise measurement depending on your needs. Note thatnever existed before, so I created it to allowandto be available.',
      features: {
        sentiment: {},
        keywords: {},
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // getData() {
  /*   // TODO: add a GET request to github microservice orgdata
      endpoint to get the comments for a specific org */
  // }

  // getAnalysis() {

  // }

  render() {
    const { orgName } = this.props;
    return (
      <div>
        <h1>Sentiment Analysis Summary</h1>
        <h2>
Overall Sentiment
          {' '}
          {orgName}
        </h2>
        <p>positive</p>

        <h2>Score</h2>
        <p>80% positive</p>

        <PieChart />

        <h2>Keywords</h2>
        <p>great, awesome, thanks!</p>

      </div>
    );
  }
}

Summary.propTypes = {
  orgName: PropTypes.string.isRequired,
};
export default Summary;
