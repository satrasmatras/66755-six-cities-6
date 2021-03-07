import React, {ReactElement, useEffect, useRef, useState} from 'react';
import L, {LatLngTuple, MapOptions, Marker} from 'leaflet';
import Offer from "../../models/offer";

import 'leaflet/dist/leaflet.css';
import City from "../../models/city";

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
  city: City,
  className: string,
  mainOffer?: Offer,
}

const Map = ({offers, city, className, mainOffer = null}: MapProps): ReactElement => {
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
    if (map && mainOffer) {
      const {latitude, longitude} = mainOffer.location;
      const marker: Marker = L.marker([latitude, longitude], {icon: mainIcon});
      marker.addTo(map);
    }
  }, [mainOffer, map]);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [city, map]);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      offers.forEach((offer) => {
        if (offer !== mainOffer) {
          const coords: LatLngTuple = [offer.location.latitude, offer.location.longitude];
          const marker = L.marker(coords, {icon});
          markers.push(marker);
          marker.addTo(map);
        }
      });
    }

    return () => {
      if (map) {
        markers.forEach((marker: Marker) => {
          marker.remove();
        });
      }
    };
  }, [offers, map]);

  return (
    <section className={className} ref={mapRef} />
  );
};

export default Map;
