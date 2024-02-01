import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { Qudit, QuditClass, CouplingClass } from './interface';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private apiUrl = "https://34.220.175.169:443/run_simulation"
  public qudits: QuditClass[] = []
  public couplings: CouplingClass[] = []

  private _energyLevels: number = 2;
  public gate_fidelity: number;
  private jobStatusSubject = new Subject<any>();

  constructor(private http: HttpClient) { }
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

  simulate() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = {
      headers,
      observe: 'response' as 'response',
      responseType: 'json' as 'json',
      // NOTE: The following line disables SSL verification
      // Only use this for testing or development purposes
      httpsAgent: { rejectUnauthorized: false },
    };
    let param = this.getSimulationParam();
    this.http.post<any>(`${this.apiUrl}`, param, options).subscribe(response => {
      let job_id = response.body.job_id
      this.checkJobResult(job_id)
    })
  }
  getJobStatusSubject() {
    return this.jobStatusSubject.asObservable();
  }
  checkJobResult(job_id) {
    const checkInterval = 5000;
    const subscription = interval(checkInterval).subscribe(() => {
      this.http.get(`https://34.220.175.169/simulation_data/${job_id}`).subscribe(
        (response: any) => {
          // Check if the job is done
          if (response.message) {
            console.log(response.message);
          } else {
            subscription.unsubscribe(); // Stop the interval
            this.gate_fidelity = response.task_results[0].fidelity
            this.jobStatusSubject.next({ done: true, result: this.gate_fidelity })
          }
        },
        (error) => {
          console.error('Error occurred while checking job status:', error);
          subscription.unsubscribe(); // Stop the interval in case of an error
        }
      );
    });
  }
  getSimulationParam() {
    let param = {
      "qudits": this.qudits.map(q => q.id + 1),
      "coupling_map": this.couplings.map(c => [c.qudit1.id + 1, c.qudit2.id + 1]),
      "tf": 200,
      "qudits_config": this.qudits.reduce((result, qudit) => { return { ...result, ...qudit.toJSON() } }, {}),
      "coupling_config": this.couplings.map(c => c.toJSON()),
      "solver_opt": {
        "type": "redfield",
        "vectorize": true,
        "int_atol": 1e-6,
        "int_rtol": 1e-6,
        "unitary_ode_opt": {
          "alg": "Tsit5",
          "rtol": 1e-6,
          "atol": 1e-6
        },
        "ode_opt": {
          "alg": "LinearExponential",
          "nsteps": 100,
          "rtol": 1e-6,
          "atol": 1e-6
        }
      },
      "tasks": [
        {
          "type": "gate_fidelity",
          "target": {
            "qudit": 1,
            "gate": "XGate"
          }
        }
      ]
    }
    param["qudits_config"]["qudit_1"]["drive_freq"] = 0.8011043099426882
    param["qudits_config"]["qudit_1"]["x_drive"] = {
      "type": "gaussian",
      "scale": 0.003361971298528725,
      "mu": 100,
      "sigma": 30,
      "v_shift": 8.166326661816133e-5,
      "tspan": [
        0,
        200
      ]
    }
    console.log(param)
    return param
  }
}
