import React, { Component } from 'react';
import axios from 'axios';
import { scaleTime, scaleLinear } from '@vx/scale';
import moment from 'moment';
import { extent, max, min } from 'd3-array';
import './App.css';
import MainSvg from './components/MainSvg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
      width: 1000,
      height: 500,
      top: 10,
      bottom: 10,
      right: 10,
      left: 10,
      gridColor: '#ffcb9e',
      strokeColor: '#ffffff',
      min: -100,
      max: 1000,
      data: [],
      date: null,
    }
  }

  handleClick = () => {
    const postbody = {
      jsonrpc: "2.0",
      method: 'generateIntegers',
      params: {
        apiKey: 'ce05863a-e3c0-4b87-8efb-8062350f1f53',
        n: this.state.number,
        min: this.state.min,
        max: this.state.max
      },
      id: 77
    }
    axios.post('https://api.random.org/json-rpc/1/invoke', postbody)
      .then(
        response => {
          this.setState({
            data: response.data.result.random.data,
            date: Date.UTC()
          })
        }
      );
  }

  handleChange = (event) => {
    this.setState({
      number: event.target.value
    });
  }

  render() {
    function getDates(startDate, stopDate) {
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
          dateArray.push( moment(currentDate).format('YYYY-MM-DD HH:MM:SS'))
          currentDate = moment(currentDate).add(1, 'hour');
      }
      return dateArray;
  }
  
    // var str = "2013-01-14-14-09-49";
    // var p = str.split("-");
    // var date = new Date(p[0], p[1], p[2], p[3], p[4], p[5]);
    // console.log(date);

  var dates= (getDates(moment(new Date()), moment(new Date()).add(1,'days')));

    var xy = [];
    for (var i = 0; i < this.state.data.length; i++) {
      xy.push({ x:dates[i] , y: this.state.data[i] });
    }

    // accessors
    const x = d => d.x;
    const y = d => d.y;

    const xMax = this.state.width;
    const yMax = this.state.height;

    const xScale = scaleTime({
      domain:[new Date(), moment(new Date()).add(1,'days')],
      // domainn:[min(dates), max(dates)],
      range: [0, xMax],
    });

    const yScale = scaleLinear({
      range: [0, yMax],
      domain: [0, 1000],
    });

    return (
      <div className="App">
        <span>Enter the Number of records:</span>
        <input
          type='number'
          onInput={this.handleChange.bind(this)}
        />
        <button
          type='button'
          disabled={this.state.number <= 0}
          onClick={this.handleClick}
        > Load </button>
        <div>
          <MainSvg
            data={xy}
            width={this.state.width}
            height={this.state.height}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            top={this.state.top}
            bottom={this.state.bottom}
            right={this.state.right}
            left={this.state.left}
            gridColor={this.state.gridColor}
            strokeColor={this.state.strokeColor}
            xMax={xMax}
            yMax={yMax}
            date={this.state.date}
          />
        </div>
      </div>
    );
  }
}

export default App;
