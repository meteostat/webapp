const toCelsius = (v: null|number): null|number => {
  return v === null ? null : Math.round(((v - 32) * (5/9)) * 10) / 10
}

const toMillimeters = (v: null|number): null|number => {
  return v === null ? null : Math.round((v * 25.4) * 10) / 10
}

const toKMH = (v: null|number): null|number => {
  return v === null ? null : Math.round((v / 0.6214) * 10) / 10
}

const toFahrenheit = (v: null|number): null|number => {
  return v === null ? null : Math.round(((v * 9 / 5) + 32) * 10) / 10
}

const toInches = (v: null|number): null|number => {
  return v === null ? null : Math.round((v / 25.4) * 1000) / 1000
}

const toMPH = (v: null|number): null|number => {
  return v === null ? null : Math.round((v * 0.6214) * 10) / 10
}

export { toCelsius, toMillimeters, toKMH, toFahrenheit, toInches, toMPH }