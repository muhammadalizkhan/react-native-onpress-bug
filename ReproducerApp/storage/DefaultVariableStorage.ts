import { useEffect, useState } from 'react';

export default class DefaultVariableStorage<T> {
  memoryVariable: T;
  key_name: string;
  private listners: Array<() => void> = [];
  constructor(key_name: string, defaultValue: T) {
    this.memoryVariable = defaultValue;
    this.key_name = key_name;
  }

  load() {
    const stringGet = this.getString();
    if (stringGet != null) {
      this.memoryVariable = JSON.parse(stringGet);
    }
  }
  getString() {}
  setString(val: string) {}
  setStorage(value: T, refresh: boolean = true) {
    this.memoryVariable = value;
    if (refresh) {
      this.refreshListeners();
    }
    this.setString(JSON.stringify(value));
  }
  refreshListeners() {
    this.listners.forEach(listener => listener());
  }
  registerListen(listen: () => void): () => void {
    this.listners.push(listen);
    return () => {
      const index = this.listners.indexOf(listen);
      if (index > -1) {
        this.listners.splice(index, 1);
      }
    };
  }
  useHook(): T | undefined {
    const [userState, setUserState] = useState<T | undefined>(
      this.memoryVariable,
    );
    useEffect(() => {
      const listen = () => {
        setUserState(this.memoryVariable);
      };
      return this.registerListen(listen);
    }, []);
    return userState;
  }
}
