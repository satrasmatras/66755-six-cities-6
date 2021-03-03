import React, {ReactElement, useEffect, useRef, useState} from 'react';
import L, {LatLngTuple, MapOptions} from 'leaflet';
import Offer from "../../models/offer";

import 'leaflet/dist/leaflet.css';

const icon = L.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const mainIcon = L.icon({
  iconUrl: `img/pin-active.svg`,
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
  offers: Offer[],
  className: string,
  mainMarker?: LatLngTuple,
}

const Map = ({offers, className, mainMarker = null}: MapProps): ReactElement => {
  const mapRef = useRef();
  const [map, setMap] = useState<L.Map>(null);

  useEffect(() => {
    setMap(L.map(mapRef.current, MAP_OPTIONS));

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      L
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(map);

      map.setView(CITY_COORDS, ZOOM);
    }
  }, [map]);

  useEffect(() => {
    if (map && mainMarker) {
      L
        .marker(mainMarker, {icon: mainIcon})
        .addTo(map);
      map.setView(mainMarker, ZOOM);
    }
  }, [mainMarker, map]);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const coords: LatLngTuple = [offer.location.latitude, offer.location.longitude];
        L
          .marker(coords, {icon})
          .addTo(map);
      });
    }
  }, [offers, map]);

  return (
    <section className={className} ref={mapRef} />
  );
};

export default Map;
