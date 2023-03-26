// função a ser consertada que remove um elemento específico da queue
// Array.prototype.removeFromArray = function(elem) {
//   const index = this.indexOf(elem);
  
//   if (index !== -1) {
//     this.splice(index, 1);
//   }
// };

class PriorityQueue {
    constructor() {
      this.items = [];
    }
  
    enqueue({ name }) {
      this.items.push({ name });
    }
  
    // dequeue({ name }) {
    //   return this.items.removeFromArray({ name });
    // }
    dequeue(){
      return this.items.shift();
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    size() {
      return this.items.length;
    }
    forEach(callback) {
      for (let i = 0; i < this.items.length; i++) {
        callback(this.items[i], i, this.items);
      }
    }
    toString() {
      return this.items.map(item => `${item.name}`).join(', ');
    }
    toArray() {
      return this.items.slice();
    }
    indexOf(name) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].name === name) {
          return i;
        }
      }
      return -1;
    }
  }
  
  module.exports = PriorityQueue;
  