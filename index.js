const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  minutes: document.querySelector('[data-value="mins"]'),
  seconds: document.querySelector('[data-value="secs"]')
}

class CountdownTimer {
  constructor({ onTick, targetDate }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.targetDate = targetDate;

    this.init();
    this.start();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    const startTime = this.targetDate;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.padDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  padDays(value) {
    return String(value).padStart(3, '0');
  }
};

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 31, 2020'),
  onTick: updateClockface,
});

function updateClockface({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${mins}`;
  refs.seconds.textContent = `${secs}`;
}

