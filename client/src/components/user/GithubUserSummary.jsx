import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ThreePieChart from './ThreeFieldPieChart';
import RadarChart from './RadarChart';

const exampleData = [
  {
    sentiment: {
      labels: [
        'Neutral',
        'Positive',
        'Negative',
      ],
      data: [
        9,
        12,
        8,
      ],
    },
  },
  {
    emotion: {
      labels: [
        'Sadness',
        'Joy',
        'Fear',
        'Disgust',
        'Anger',
      ],
      data: [
        25.77,
        18.26,
        6.85,
        5.18,
        9.80,
      ],
    },
  },
];

class GithubUserSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threePieData: {},
      radarData: {},
    };
  }

  componentDidMount() {
    this.setState({
      radarData: Object.assign({}, exampleData[1].emotion),
      threePieData: Object.assign({}, exampleData[0].sentiment),
    });
    // axios.get('/api/gateway/github/user/andrew')
    //   .then((result) => {
    //     console.log(result);
    //     const response = res.data;
    //     this.setState({
    //       radarData: Object.assign({}, response[1].emotion),
    //       threePieData: Object.assign({}, response[0].sentiment),
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  render() {
    const { username } = this.props;
    const { threePieData, radarData } = this.state;
    return (
      <div>
        <h2 className="gitviews">
          GitHub Issue Analysis Summary for
          {' '}
          {username}
        </h2>

        <div className="gitviews">
          <div>
            <h4>Average emotion conveyed by each GitHub issue</h4>
            <RadarChart data={radarData} labelTag="Issues" />
          </div>
          <div>
            <h4>Number of issues contributed to each sentiment</h4>
            <ThreePieChart score={threePieData} />
          </div>
        </div>
      </div>
    );
  }
}

GithubUserSummary.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GithubUserSummary;
