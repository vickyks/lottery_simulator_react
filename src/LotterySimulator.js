import React from 'react';
import { connect } from 'react-redux';

import store, { startDrawing, stopDrawing, updateBalls } from './store';

import './LotterySimulator.css';

const generateAvailableBalls = (totalBalls, selectedBalls) => {
  const allBalls = Array.from({ length: totalBalls }, (_, index) => index + 1);
  return allBalls.filter((ball) => !selectedBalls.includes(ball));
}

class LotterySimulator extends React.Component {

  pickUniqueBalls = (range, count) => {
    const balls = []
    const availableBalls = Array.from({ length: range }, (_, i) => i + 1);
    while (balls.length < count) {
      const randomIndex = Math.floor(Math.random() * availableBalls.length);
      const ball = availableBalls[randomIndex];
      availableBalls.splice(randomIndex, 1);
      balls.push(ball);
    }

    balls.sort((a, b) => a - b);
    return balls;
  }

  handleClick = () => {
    const { isDrawing, startDrawing, stopDrawing, updateBalls } = this.props;

    if (!isDrawing) {
      startDrawing();

      // Simulate ball animations
      const animationInterval = setInterval(() => {
        const balls49 = this.pickUniqueBalls(49, 6)
        const balls12 = this.pickUniqueBalls(12, 2)

        updateBalls(balls49, balls12);
      }, 200); // end setInterval

      // Stop drawing after a duration
      setTimeout(() => {
        clearInterval(animationInterval);
        stopDrawing();
      }, 3000);
    }
  }; // end handleClick


  render() {
    const { balls49, balls12, isDrawing } = this.props;

    const getBallNumberClassName = (number) => {
      const range = Math.floor(number / 10) * 10;
      return `ball ball-number--${range}s`;
    };

    console.log(balls49, balls12, isDrawing);

    return (
      <div className="container">
       <div>
        <button onClick={this.handleClick} disabled={isDrawing}>
          {isDrawing ? 'Drawing...' : 'Start Drawing'}
        </button>
        <h3>Main picks</h3>
        <div className="balls-container">
          {
            balls49.map((ball, index) => (
              <div key={index} className={getBallNumberClassName(ball)}>
                <div className="ball-number">{ball}</div>
              </div>
            ))
          }
        </div>
        <h3>Star balls</h3>
        <div className="balls-container">
          {balls12.map((ball, index) => (
            <div key={index} className="ball star-pick">
              <div className="ball-number">{ball}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  balls49: state.balls49 || [],
  balls12: state.balls12 || [],
  isDrawing: state.isDrawing || false,
});

const mapDispatchToProps = {
  startDrawing,
  stopDrawing,
  updateBalls,
};

export default connect(mapStateToProps, mapDispatchToProps)(LotterySimulator);
