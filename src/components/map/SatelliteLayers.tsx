import React from 'react';
import { WMSTileLayer, TileLayer } from 'react-leaflet';

interface SatelliteLayersProps {
  visible: boolean;
}

const SatelliteLayers: React.FC<SatelliteLayersProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <>
      {/* Option 1: NRW DOP Service */}
      <WMSTileLayer
        url="https://www.wms.nrw.de/geobasis/wms_nw_dop"
        layers="nw_dop"
        format="image/png"
        transparent={false}
        version="1.1.1"
        attribution="© GeoBasis NRW"
      />

      {/* Option 2: Alternative raster layer */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />

      {/* Option 3: OpenAerialMap */}
      <TileLayer
        url="https://tiles.openaerialmap.org/5a9f90c42553e6000ce5ad6c/0/5a9f90c42553e6000ce5ad6d/{z}/{x}/{y}.png"
        attribution="© OpenAerialMap"
      />
    </>
  );
};

export default SatelliteLayers;
