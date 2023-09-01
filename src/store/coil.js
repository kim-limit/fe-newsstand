class Atom {
  #key;
  #listeners;
  #value;

  constructor({ key, defaultValue }) {
    this.#key = key;
    this.#value = defaultValue;
    this.#listeners = new Set();
  }

  snapshot() {
    return this.#value;
  }

  #emit() {
    this.#listeners.forEach((listener) => {
      listener();
    });
  }

  update(value, isEmit) {
    this.#value = value;
    if (isEmit) this.#emit();
  }

  subscribe(callback) {
    this.#listeners.add(callback);
  }
}

class Selector {
  #key;
  #get;
  #set;

  constructor({ key, get, set }) {
    this.#key = key;
    this.#get = get;
    this.#set = set;
  }

  snapshot() {
    return this.#get({ set: useSetAtom, get: useGetAtom });
  }

  update(value) {
    this.#set({ set: useSetAtom, get: useGetAtom }, value);
  }
}

const atom = ({ key, defaultValue }) => {
  return new Atom({ key, defaultValue });
};

const useGetAtom = (atom) => {
  return atom.snapshot();
};

const useSetAtom = (atom, value, isEmit = true) => {
  atom.update(value, isEmit);
};

const useSubscribeAtom = (atom, ...callbacks) => {
  callbacks.forEach((callback) => atom.subscribe(callback));
};

const selector = ({ key, get, set }) => {
  return new Selector({ key, get, set });
};

const useGetSelector = (selector) => {
  return selector.snapshot();
};

const useSetSelector = (selector, value) => {
  selector.update(value);
};

export {
  atom,
  useGetAtom,
  useSetAtom,
  useSubscribeAtom,
  selector,
  useGetSelector,
  useSetSelector,
};
