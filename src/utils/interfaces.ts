import { ChartData, ChartOptions } from 'chart.js'

interface HourlyRecordInterface {
  time: string,
  temp: number,
  dwpt: number,
  rhum: number,
  prcp: number,
  snow: number,
  wdir: number,
  wspd: number,
  wpgt: number,
  pres: number,
  tsun: number,
  coco: number
}

interface ChartDefinitionInterface {
  data: ChartData | any,
  options?: ChartOptions | any
}

export { HourlyRecordInterface, ChartDefinitionInterface }