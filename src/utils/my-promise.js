const checkIsFunction = (func) => {
  return typeof func === "function";
};

const checkIsPromise = (value) => {
  return value instanceof MyPromise;
};

const PROMISE_STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

export class MyPromise {
  // 프로미스를 등록하면 pending 상태
  // excutor 즉, 처음 프로미스를 선언할때 전달해야 하는 resolve, reject
  #onFulfilled;
  #onRejected;
  #thenPromiseReject;
  #thenPromiseResolve;
  #state;

  /**
   * MyPromise의 constructor
   * @param {*} executor (resolve, reject)
   */
  constructor(executor) {
    this.#state = PROMISE_STATE.PENDING;
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  /**
   * 값을 반환하기 위한 메서드
   * @param {*} value 비동기적으로 사용할 값
   * @returns
   */
  _resolve(value) {
    // pending가 아니면 즉, settled 상태이면 return
    if (this.#state !== PROMISE_STATE.PENDING) return;

    // resolve 하기 때문에 fulfilled로 변경
    this.#state = PROMISE_STATE.FULFILLED;

    queueMicrotask(() => {
      if (!this.#onFulfilled) return;

      try {
        // then fulfilled 함수 결과
        const returnValue = this.#onFulfilled(value);
        // 결과값이 promise 타입인지 확인
        const isReturnValuePromise = checkIsPromise(returnValue);

        // promise 면 then 으로 다시 실행 시켜줌
        // promise 아니면 다음 then 로작 실행
        isReturnValuePromise
          ? returnValue.then(this.#thenPromiseResolve, this.#thenPromiseReject)
          : this.#thenPromiseResolve(returnValue);
      } catch (error) {
        this.#thenPromiseReject(error);
      }
    });
  }

  /**
   * 에러를 반환하기 위한 메서드
   * @param {*} error 에러를 넘긴 값
   * @returns
   */
  _reject(error) {
    if (this.#state !== PROMISE_STATE.PENDING) return;

    this.#state = PROMISE_STATE.REJECTED;

    queueMicrotask(() => {
      if (!this.#onRejected) return;

      try {
        const returnValue = this.#onRejected(error);
        const isReturnValuePromise = checkIsPromise(returnValue);

        isReturnValuePromise
          ? returnValue.then(this.#thenPromiseResolve, this.#thenPromiseReject)
          : this.#thenPromiseResolve(returnValue);
      } catch (error) {
        this.#thenPromiseReject(error);
      }
    });
  }

  /**
   * resolve나 reject한 내부 로직에 실행시킬 함수를 전달할 함수
   * @param {*} onFulfilled resolve 시킨 함수
   * @param {*} onRejected reject 시킨 함수
   * @returns 새로운 MyPromise
   */
  then(onFulfilled, onRejected) {
    // #onFulfilled 함수로 들어왔는지 확인
    this.#onFulfilled = checkIsFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;

    // #onRejected 함수로 들어왔는지 확인
    this.#onRejected = checkIsFunction(onRejected)
      ? onRejected
      : (error) => {
          throw error;
        };

    // 다음 then에 resolve, reject 주입
    return new MyPromise((resolve, reject) => {
      this.#thenPromiseResolve = resolve;
      this.#thenPromiseReject = reject;
    });
  }

  /**
   * reject된 상태를 탐지하는 메서드
   * @param {*} onRejected  reject 시키는 메서드
   * @returns 에러에 대한 로직
   */
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * 프로미스 내에서 값을 반환하는 static 메서드
   * @param {*} value 비동기적으로 사용하고 싶은 값
   * @returns value | MyPromise
   */
  static resolve(value) {
    const isValuePromise = checkIsPromise(value);

    // value가 promise먄 value 그대로 return
    if (isValuePromise) {
      return value;
    }

    // promise 아니면 promise로 묶어서 return
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  /**
   * 프로미스 내에서 에러를 반환하는 static 메서드
   * @param {*} value 비동기적으로 사용하고 에러 값
   * @returns value를 가진 에러
   */
  static reject(value) {
    // reject이면 promise로 묶어서 return
    return new MyPromise((_, reject) => {
      reject(value);
    });
  }

  /**
   * 프로미스들을 병렬적으로 실행시켜주는 static 메서드
   * @param {*} iterable MyPromise 리스트
   * @returns MyPromise 리스트를 resolve한 결과를 담은 MyPromise
   */
  static all(iterable) {
    return new MyPromise((resolve, reject) => {
      let count = iterable.length;
      const returnArray = [];
      iterable.forEach((ps, index) => {
        MyPromise.resolve(ps)
          .then((value) => {
            returnArray[index] = value;
            --count;
            !count && resolve(returnArray);
          })
          .catch(reject);
      });
    });
  }
}
