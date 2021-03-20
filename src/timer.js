import React, { Component } from "react";
import "./tailwind.css";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isFocused: false,
      focusText: "Start Focus session",
    };
  }
  zeit = (i) => {
    var sec_num = parseInt(i, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  componentDidMount() {
    const { startCount } = this.props;
    this.setState({
      count: startCount,
    });
    //this.doIntervalChange();
  }

  doIntervalChange = () => {
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  startFocus = () => {
    this.setState(
      (prevState) => ({
        isFocused: !prevState.isFocused,
      }),
      () => {
        console.log(this.state.isFocused);
        if (this.state.isFocused) {
          this.setState({
            focusText: "Take a Break",
          });
          this.doIntervalChange();
        } else {
          this.setState({
            focusText: "Start Focus session",
          });
          this.setState({ count: 0 });
          clearInterval(this.myInterval);
        }
      }
    );
  };

  render() {
    const { count } = this.state;
    const { focusText } = this.state;
    return (
      <div className="bg-teal-600 h-screen text-white flex flex-col items-center">
        <h1 className="text-center font-bold text-5xl w-full">
          {this.zeit(count)}
        </h1>
        <button
          className="rounded-lg  border-2 border-solid border-white py-3 px-8"
          onClick={this.startFocus}
        >
          {focusText}
        </button>
      </div>
    );
  }
}

export default Timer;
