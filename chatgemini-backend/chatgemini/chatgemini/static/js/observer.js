export default class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  list() {
    console.log(this.observers);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
