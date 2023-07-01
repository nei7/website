export interface Datapoint {
  total_seconds: number;
  name: string;
  percent: number;
  digital: string;
  decimal: string;
  text: string;
  hours: number;
  minutes: number;
}

export interface Summary {
  categories: Datapoint[];
  dependencies: Datapoint[];
  editors: Datapoint[];
  languages: Datapoint[];
  grand_total: {
    text: string;
    total_seconds: number;
    decimal: string;
    digital: string;
    hours: string;
    minutes: string;
  };
  machines: Datapoint[];
  operating_systems: Datapoint[];
  projects: Datapoint[];
  range: {
    date: string;
    end: string;
    start: string;
    text: string;
    timezone: string;
  };
}
