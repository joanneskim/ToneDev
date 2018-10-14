import React from 'react';
import axios from 'axios';
import Summary from '../SummaryView';
import RadarChart from './RadarChart';
import ThreePieChart from './ThreeFieldPieChart';

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      SOUsername: '',
      pieData: {},
      radarData: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSOname = this.submitSOname.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitSOname() {
    const { SOUsername } = this.state;
    axios.get('/api/user/so', {
      params: {
        username: SOUsername,
      },
    })
      .then((res) => {
        console.log(res.data);
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
                0.2577819655172414,
                0.1826078620689655,
                0.06859010344827586,
                0.05188851724137931,
                0.09804044827586207,
              ],
            },
          },
        ];
        this.setState({
          radarData: Object.assign({}, exampleData[1].emotion),
          pieData: Object.assign({}, exampleData[0].sentiment),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { pieData, radarData } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="SOuserName">
          StackOverflow Username:
            <input type="text" name="SOUsername" onChange={this.handleChange} />
          </label>
          <input type="button" value="Submit" onClick={this.submitSOname} />
        </form>
        <RadarChart data={radarData} />
        <ThreePieChart score={pieData} />
        <Summary />

      </div>
    );
  }
}

export default User;
