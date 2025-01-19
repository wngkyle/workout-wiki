const stdin = process.stdin

class MyClass {
  constructor() {
    this._privateVariable = null;
    this._variablePromise = new Promise(resolve => {
      this._resolveVariable = resolve;
    });
    this._testVariable = 5
  }

  setPrivateVariable(value) {
    this._privateVariable = value;
    this._resolveVariable(value);
  }

  async doSomething() {
    console.log('Private variable is defined (Before):', this._privateVariable);
    await this._variablePromise;
    console.log('Private variable is defined (After):', this._privateVariable);
    console.log("ALL DONE!")
  }
}

const instance = new MyClass();
instance.doSomething(); // This will wait until setPrivateVariable is called
const timeoutt = setTimeout(() => instance.setPrivateVariable(85), 5000)
