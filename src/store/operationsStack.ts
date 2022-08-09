import { makeAutoObservable } from "mobx";

export type UndoFunction = () => void;

export class OperationsStack {
  operations: UndoFunction[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  push(undo: UndoFunction) {
    this.operations.push(undo);
  }

  undo() {
    const undoFunction = this.operations.pop();
    if (undoFunction) undoFunction();
  }
}

export const operationsStack = new OperationsStack();
