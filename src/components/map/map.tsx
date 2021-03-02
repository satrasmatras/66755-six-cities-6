import React, {ReactElement, useEffect, useRef} from 'react';
import L, {LatLngTuple, MapOptions} from 'leaflet';
import Offer from "../../models/offer";

import 'leaflet/dist/leaflet.css';

const icon = L.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const ZOOM = 12;
const CITY_COORDS: LatLngTuple = [52.38333, 4.9];
const MAP_OPTIONS: MapOptions = {
  center: CITY_COORDS,
  ZOOM,
  zoomControl: false,
  marker: true,
} as MapOptions;

interface MapProps {
  offers: Offer[];
}

const Map = ({offers}: MapProps): ReactElement => {
  const mapRef: React.MutableRefObject<L.Map | undefined> = useRef();

  useEffect(() => {
    mapRef.current = L.map(`map`, MAP_OPTIONS);

    L
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    mapRef.current.setView(CITY_COORDS, ZOOM);
  }, []);

  useEffect(() => {
    offers.forEach((offer) => {
      const coords: LatLngTuple = [offer.location.latitude, offer.location.longitude];
      L
        .marker(coords, {icon})
        .addTo(mapRef.current);
    });

  }, [offers]);

  return (
    <section className="cities__map map" id="map" />
  );
};

export default Map;
