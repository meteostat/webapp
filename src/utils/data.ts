import { parseISO, getDaysInMonth } from 'date-fns';

const notNull = (values: number[]) => values.filter((v) => v !== null);

const getAverage = (values: number[]): null | number => {
  values = notNull(values);
  if (values.length > 0) {
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    return Number(avg.toFixed(1));
  }
  return null;
};

const getSum = (values: number[], precision: number = 1): null | number => {
  values = notNull(values);
  if (values.length > 0) {
    const sum = values.reduce((a, b) => a + b, 0);
    return Number(sum.toFixed(precision));
  }
  return null;
};

const getAnomaly = (values: number[] = [], times: string[] = [], normals: number[] = []) => {
  if (!(values.length && times.length && normals.length)) {
    return null;
  }
  const anomalies: number[] = [];
  times.forEach((time, index) => {
    const value = values[index];
    const date = parseISO(time);
    const normal = normals[date.getMonth()];
    if (value !== null && normal) {
      const anomaly = value - normal;
      anomalies.push(anomaly);
    }
  });
  const anomalySum = anomalies.reduce((a, b) => a + b, 0);
  let anomaly = (anomalySum / anomalies.length).toFixed(1);
  anomaly = Number(anomaly) < 0 ? anomaly : `+${anomaly}`;
  return anomalies.length ? anomaly : null;
};

const getSumAnomaly = (
  values: number[] = [],
  times: string[] = [],
  normals: any[] = [],
  precision: number = 1,
  daily: boolean = false
) => {
  if (!(values.length && times.length && normals.length)) {
    return null;
  }
  const anomalies: number[] = [];
  times.forEach((time, index) => {
    const value = values[index];
    const date = parseISO(time);
    const daysInMonth = getDaysInMonth(date);
    const normal = normals[date.getMonth()] / (daily ? daysInMonth : daysInMonth * 24);
    if (value !== null && normal) {
      const anomaly = value - normal;
      anomalies.push(anomaly);
    }
  });
  const anomalySum = anomalies.reduce((a, b) => a + b, 0);
  let anomaly = anomalySum.toFixed(precision);
  anomaly = Number(anomaly) < 0 ? anomaly : `+${anomaly}`;
  return anomalies.length ? anomaly : null;
};

export { notNull, getAverage, getSum, getAnomaly, getSumAnomaly };
