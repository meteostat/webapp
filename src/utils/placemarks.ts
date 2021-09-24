const encodePlacemark = (lat: number, lon: number): string => {
  // Make positive
  lat = lat < 0 ? 90 + Math.abs(lat) : lat;
  lon = lon < 0 ? 180 + Math.abs(lon) : lon;
  // Convert to base 35
  let first = Math.round(lat * 100).toString(35)
  let second = Math.round(lon * 100).toString(35)
  // Create lat & lon segment
  first = first.padStart(3, '0').toUpperCase()
  second = second.padStart(3, '0').toUpperCase()
  // Return placemark
  return first + second
}

const decodePlacemark = (placemark: string): Array<number> => {
  // Get lat & lon segment
  const first = placemark.substr(0, 3)
  const second = placemark.substr(3, 3)
  // Convert to base 10
  let lat = parseInt(first, 35) / 100;
  let lon = parseInt(second, 35) / 100;
  // Convert negative values
  lat = lat > 90 ? 90 - lat : lat;
  lon = lon > 180 ? 180 - lon : lon;
  // Return placemark
  return [lat, lon];
}

export { encodePlacemark, decodePlacemark }