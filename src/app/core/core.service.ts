import { Injectable } from '@angular/core';
import { Qudit, QuditClass, CouplingClass } from './interface';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public qudits: QuditClass[] = []
  public couplings: CouplingClass[] = []

  private _energyLevels: number = 2;

  constructor() { }
  get energyLevels(): number {
    return this._energyLevels;
  }
  set energyLevels(num) {
    this._energyLevels = num
  }

  addQudit() {
    let newQudit: QuditClass = new QuditClass(this.qudits.length, this.energyLevels)
    this.qudits.push(newQudit)
  }

  removeQudit(qudit: QuditClass) {
    let index = this.qudits.indexOf(qudit)
    this.qudits.splice(index, 1)
  }

  addCoupling(q1: QuditClass, q2: QuditClass) {
    let coupling: CouplingClass = new CouplingClass(q1, q2)
    this.couplings.push(coupling)
  }

  removeCoupling(coupling: CouplingClass) {
    let index = this.couplings.indexOf(coupling)
    this.couplings.splice(index, 1)
  }
}
