const useLeaflet = async () => {
  return await import('leaflet');
};

// CARTO Voyager raster tiles; requests without a key are answered with "API key required" tiles
export const TILE_URL = `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${import.meta.env.VITE_CARTO_API_KEY ?? ''}`;

export default useLeaflet;
