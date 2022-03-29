// https://gka.github.io/palettes/#/25|d|9b50ba,4d6fb7,51aed4,5cb85c|5cb85c,fff055,e27a50,8c1c56|0|1
const tempScale: Array<string> = [
  '#9b50ba',
  '#8d5aba',
  '#8165ba',
  '#776fbb',
  '#6f79bb',
  '#6983ba',
  '#658db8',
  '#6397b2',
  '#62a0aa',
  '#62a89e',
  '#62af8e',
  '#61b478',
  '#5cb85c',
  '#87c35b',
  '#a6c85a',
  '#bcc659',
  '#cbbf58',
  '#d4b457',
  '#d7a557',
  '#d49357',
  '#cd7e57',
  '#c26857',
  '#b35057',
  '#a13756',
  '#8c1c56'
];

// https://gka.github.io/palettes/#/25|d|5cb85c,51aed4|51aed4,4d6fb7,9b50ba|0|1
const prcpScale: Array<string> = [
  '#5cb85c',
  '#5eb767',
  '#60b671',
  '#61b57b',
  '#61b585',
  '#61b48f',
  '#61b399',
  '#60b2a3',
  '#5fb1ad',
  '#5cb0b7',
  '#5ab0c0',
  '#56afca',
  '#51aed4',
  '#53a4cf',
  '#559acb',
  '#5991c8',
  '#5e88c4',
  '#6380c1',
  '#6979bf',
  '#7072bd',
  '#786bbc',
  '#7f64ba',
  '#885eba',
  '#9157ba',
  '#9b50ba'
];

// https://gka.github.io/palettes/#/25|d|eeeeee,51aed4,5cb85c,fff055|fff055,e27a50,8c1c56,9b50ba|0|1
const wspdScale: Array<string> = [
  '#eeeeee',
  '#cfdfe6',
  '#b5d4da',
  '#a1cbcc',
  '#94c6bd',
  '#8dc2ad',
  '#8dc29d',
  '#92c48d',
  '#9dc87e',
  '#accf70',
  '#c2d864',
  '#dde35b',
  '#fff055',
  '#f8d456',
  '#efb957',
  '#e49f58',
  '#d8895b',
  '#cb745f',
  '#c06364',
  '#b5556a',
  '#ac4a73',
  '#a4447f',
  '#9f438f',
  '#9c47a2',
  '#9b50ba'
];

// https://gka.github.io/palettes/#/25|d|9b50ba,4d6fb7,51aed4,5cb85c|5cb85c,fff055,e27a50,8c1c56|0|1
const presScale: Array<string> = [
  '#9b50ba',
  '#8d5aba',
  '#8165ba',
  '#776fbb',
  '#6f79bb',
  '#6983ba',
  '#658db8',
  '#6397b2',
  '#62a0aa',
  '#62a89e',
  '#62af8e',
  '#61b478',
  '#5cb85c',
  '#87c35b',
  '#a6c85a',
  '#bcc659',
  '#cbbf58',
  '#d4b457',
  '#d7a557',
  '#d49357',
  '#cd7e57',
  '#c26857',
  '#b35057',
  '#a13756',
  '#8c1c56'
];

class ColorScale {
  private scale: Array<string>;
  private min: number;
  private max: number;
  private zero: null | string;

  constructor(scale: Array<string>, min: number, max: number, zero: null | string = null) {
    this.scale = scale;
    this.min = min;
    this.max = max;
    this.zero = zero;
  }

  /**
   * getColor
   *
   * @property {number} value
   * @returns {string} The HEX color code
   */
  public getColor(value: null | number): string | null {
    if (value === null) {
      return null;
    }

    if (this.zero !== null && value === 0) {
      return this.zero;
    }

    const range = this.max - this.min;
    const startValue = value - this.min;
    const percentage = Math.min(1, Math.max(0, startValue / range));
    const index = Math.floor((this.scale.length - 1) * percentage);
    return this.scale[index];
  }
}

export { tempScale, prcpScale, wspdScale, presScale, ColorScale };
