import { BathType, LindbladOperator, RotationalAxis } from "./enum";

export interface ComplexNumber {
    imaginary: number;
    real: number
}
export interface Bath {
    type: BathType;
    axis: RotationalAxis;
}

export interface OhmicBath extends Bath {
    strength: number;
    exp: number;
    temperature: number;
    frequency: number;
}

export class OhmicBathClass implements OhmicBath {
    type: BathType = BathType.Ohmic;
    axis: RotationalAxis;
    strength: number;
    exp: number = 10e-4;
    frequency: number;
    temperature: number;
    constructor(axis = RotationalAxis.Z,
        strength = 0.11764967334034104,
        frequency = 2,
        temperature = 20) {
        this.axis = axis;
        this.strength = strength;
        this.frequency = frequency;
        this.temperature = temperature
    }

    toJson(): any {
        return {
            "coupling": this.axis,
            "bath": {
                "type": this.type,
                "params": {
                    "eta": this.strength * this.exp,
                    "fc": this.frequency,
                    "T": this.temperature
                }
            }
        }
    }
}

export interface SpinFluctuatorBath extends Bath {
    strength: number;
    temperature: number;
    frequency: number;
}

export class SpinFluctuatorBathClass implements SpinFluctuatorBath {
    type: BathType = BathType.Fluctuator;
    axis: RotationalAxis;
    strength: number;
    frequency: number;
    temperature: number;
    constructor(axis = RotationalAxis.X,
        strength = 1.1764967334034104e-5,
        frequency = 2,
        temperature = 20) {
        this.axis = axis;
        this.strength = strength;
        this.frequency = frequency;
        this.temperature = temperature
    }
}

export interface LindbladBath extends Bath {
    gamma: number;
    exp: number;
    operator: LindbladOperator;
}

export class LindbladBathClass implements LindbladBath {
    type: BathType = BathType.Lindblad;
    axis: RotationalAxis;
    gamma: number;
    exp: number = 10e-4;
    operator: LindbladOperator;
    constructor(axis = RotationalAxis.X,
        gamma = 0.11764967334034104,
        operator = LindbladOperator.X) {
        this.axis = axis;
        this.gamma = gamma;
        this.operator = operator;
    }
    toJson(): any {
        return {
            "coupling": this.axis,
            "bath": {
                "type": this.type,
                "params": {
                    "gamma": this.gamma * this.exp,
                    "operator": this.operator
                }
            }
        }
    }
}

export interface Qudit {
    id: number;
    num_levels: number;
    frequency?: number;
    anharmonicity?: number;
    bath?: any[];
    initialization_parameter?: ComplexNumber[];
    position?: { x: number, y: number };
}

export class QuditClass implements Qudit {
    id: number;
    num_levels: number;
    frequency: number;
    anharmonicity: number;
    bath: any[];
    initialization_parameter: ComplexNumber[];
    position: { x: number, y: number };

    constructor(
        id: number,
        num_levels: number,
        frequency: number = 0.8011043099426882,
        anharmonicity: number = 1.0,
        bath: any[] = [new OhmicBathClass()],
        position: { x: number; y: number } = { x: 0, y: 0 }
    ) {
        this.id = id;
        this.num_levels = num_levels
        this.frequency = frequency;
        this.anharmonicity = anharmonicity;
        this.bath = bath;
        this.initialization_parameter = Array.from({ length: num_levels }, () => ({ imaginary: 0, real: 1 }));
        this.position = position;
    }

    toJSON(): any {
        let name = `qudit_${this.id}`
        return {
            [name]: {
                id: this.id,
                num_lvls: this.num_levels,
                type: 'static',
                freq: this.frequency,
                anharmonicity: this.anharmonicity,
                interaction: this.bath.map(b => b.toJson()),
                initialization_parameter: this.initialization_parameter
            }
        };
    }

}
export interface Coupling {
    qudit1: Qudit;
    axis1: RotationalAxis;
    qudit2: Qudit;
    axis2: RotationalAxis;
    frequency: number;
}

export class CouplingClass implements Coupling {
    qudit1: Qudit;
    axis1: RotationalAxis;
    qudit2: Qudit;
    axis2: RotationalAxis;
    frequency: number;

    constructor(qudit1: Qudit, qudit2: Qudit, axis1: RotationalAxis = RotationalAxis.Z, axis2: RotationalAxis = RotationalAxis.Z, frequency: number = 0.01) {
        this.qudit1 = qudit1
        this.qudit2 = qudit2
        this.axis1 = axis1;
        this.axis2 = axis2;
        this.frequency = frequency;
    }

}