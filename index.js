class CountdownTimer {
  constructor({ targetDate, selector }) {
    this.targetDate = targetDate;
    this.selector = document.querySelector(selector);

    this.init();
    this.start();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.updateClockFace(time);
  }

  start() {
    const startTime = this.targetDate;

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.updateClockFace(time);
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

  updateClockFace({ days, hours, mins, secs }) {
    this.selector.textContent = `${days}:${hours}:${mins}:${secs}`;
  }
};

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(' November 9, 2020 10:59 pm'),
});



