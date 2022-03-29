import { parseISO, getDaysInMonth } from 'date-fns';

const round = (number: number, precision: number = 0): number => {
  const pow = precision === 0 ? 1 : Math.pow(10, precision);
  return Math.round((number + Number.EPSILON) * pow) / pow;
};

const notNull = (values: number[]) => values.filter((v) => v !== null);

const getAverage = (values: number[]): null | number => {
  values = notNull(values);
  if (values.length > 0) {
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    return round(avg, 1);
  }
  return null;
};

const getSum = (values: number[], precision: number = 1): null | number => {
  values = notNull(values);
  if (values.length > 0) {
    const sum = values.reduce((a, b) => a + b, 0);
    return round(sum, precision);
  }
  return null;
};

const getAnomaly = (values: number[] = [], times: string[] = [], normals: number[] = []) => {
  if (!(values?.length && times?.length && normals?.length)) {
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
  const anomaly = round(anomalySum / anomalies.length, 1);
  const result = anomaly > 0 ? `+${anomaly}` : anomaly;
  return anomalies.length ? result : null;
};

const getSumAnomaly = (
  values: number[] = [],
  times: string[] = [],
  normals: any[] = [],
  precision: number = 1,
  daily: boolean = false
) => {
  if (!(values?.length && times?.length && normals?.length)) {
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
  const anomaly = round(anomalySum, precision);
  const result = anomaly > 0 ? `+${anomaly}` : anomaly;
  return anomalies.length ? result : null;
};

export { round, notNull, getAverage, getSum, getAnomaly, getSumAnomaly };
