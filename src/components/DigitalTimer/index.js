import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimitMinutes: 25,
    isTimerRunning: false,
    timerLimitSeconds: '00',
    secondsCount: 59,
  }

  onChanageTime = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === true) {
      this.setState(prevState => ({
        timerLimitMinutes: prevState.timerLimitMinutes - 1,
      }))
    }
  }

  onChangeSecondsCount = () => {
    this.setState(prevState => ({
      secondsCount: prevState.secondsCount - 1,
    }))
  }

  onChanageTimeSeconds = () => {
    const {isTimerRunning, secondsCount} = this.state
    if (isTimerRunning === true) {
      this.onChangeSecondsCount()
      this.setState({
        timerLimitSeconds: secondsCount,
      })
    }

    if (secondsCount < 10) {
      this.setState({
        timerLimitSeconds: `0${secondsCount}`,
      })
    }

    if (secondsCount <= 0) {
      this.setState({secondsCount: 59})
    }
  }

  onIncrementMinutes = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timerLimitMinutes: prevState.timerLimitMinutes + 1,
      }))
    }
  }

  onDecrementMinutes = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timerLimitMinutes: prevState.timerLimitMinutes - 1,
      }))
    }
  }

  onChnageRunningStatus = () => {
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onChangeTimerstatus = () => {
    this.onChnageRunningStatus()
    const {isTimerRunning, timerLimitMinutes} = this.state
    const timerID = setInterval(this.onChanageTime, 60000)
    const secondsID = setInterval(this.onChanageTimeSeconds, 1000)
  }

  onResetTimer = () => {
    this.setState({
      timerLimitMinutes: 25,
      timerLimitSeconds: '00',
      secondsCount: 59,
    })
  }

  render() {
    const {timerLimitMinutes, isTimerRunning, timerLimitSeconds} = this.state
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    const displayText = isTimerRunning ? 'Pause' : 'Start'

    const textContent = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="digital-time-main-container">
        <h1 className="timer-heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-count-container">
            <div className="time-container">
              <h1 className="timer-count-heading">
                {timerLimitMinutes}:{timerLimitSeconds}
              </h1>
              <p className="timer-count-running">{textContent}</p>
            </div>
          </div>
          <div className="timer-increment-container">
            <div className="pause-reset-container">
              <img src={imageUrl} alt={altText} className="logo-image" />
              <button
                type="button"
                className="timer-icon-text vamsi"
                onClick={this.onChangeTimerstatus}
              >
                {displayText}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                className="logo-image"
              />
              <button
                className="timer-icon-text"
                type="button"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
            <p className="timer-count-running">Set Timer Limit</p>
            <div className="pause-reset-container">
              <button
                type="button"
                className="button-style"
                onClick={this.onDecrementMinutes}
              >
                -
              </button>
              <p className="time-increment">{timerLimitMinutes}</p>
              <button
                type="button"
                className="button-style"
                onClick={this.onIncrementMinutes}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
