import {
  $root,
  $observable,
  $computed,
  $effect,
  $tick,
} from '@maverick-js/observables';

console.log('TESTING');
class xtest1 {
  public obs = $observable(0);
  private _state = 1;
  async initialize(value: number) {
    $effect(() => console.log(this.obs()));
    this.obs.set(value);
    $tick();
  }

  async updateObs(value: number) {
    this.obs.next((prev) => prev + value);
    await $tick();
  }

  async run(runTimes: number) {
    if (runTimes <= 100) {
      let next;
      switch (this._state) {
        case 1:
          if (this.obs() >= 100) {
            this._state = -1;
            next = -50;
          } else {
            next = 50;
          }
          break;
        case -1:
          if (this.obs() <= -100) {
            this._state = 1;
            next = 50;
          } else {
            next = -50;
          }
          break;
      }

      setTimeout(() => {
        this.updateObs(next);
        this.run(runTimes + 1);
      }, 100);
    }
  }
}

// Import stylesheets
import './style.css';
let t1 = new xtest1();
t1.initialize(0);
t1.run(1);
console.log('TESTING');
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;
