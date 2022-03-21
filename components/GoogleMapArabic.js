import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useRouter } from "next/router";
import en from './locales/en';
import fr from './locales/fr';
import GoogleMap from './GoogleMap';
import axios from 'axios';
import CurrentMaker from './CurrentMarker';
import Markers from './Markers';

const GoogleMapArabic = () => {
  const router = useRouter()
  const { locale } = router
  const t = locale === 'en' ? en : fr
  const [longitude, setLongitude] = useState("")
  const [latitude, setLatitude] = useState("")

  const [fetchMapData, setFetchMapData] = useState([])
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);

  const onMapClicked = async (clickEvent) => {
    setLongitude(clickEvent.lng)
    setLatitude(clickEvent.lat)
    // let payload = {
    //   longitude: clickEvent.lng,
    //   latitude: clickEvent.lat

    // }

    // const res = await axios.post("https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/save-map", payload)
  }

  useEffect(() => {
    axios.get("https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/getMaps").then((res) => {
      setFetchMapData(res.data.data)
    })

  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position", position.coords);
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)
    })
  }, [])

  return locale === "ar" ? (
    // Important! Always set the container height explicitly
    <div className='container-fluid'>
      <div className=''>
        <div className='row'>
          <div className='col-md-4 station'>
            <div className='station__heading'>
              <h2>{t.googleMap.station}</h2>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='map'>
              <Map
                google={google}
                // bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
                center={{
                  lat: latitude,
                  lng: longitude
                }}
                zoom={11}
                onClick={onMapClicked}
              >
                {
                  fetchMapData.map((m, i) => {
                    return (
                      <Marker
                        key={i}
                        position={{
                          lat: m.latitude,
                          lng: m.longitude
                        }}
                        onClick={(props, marker) => {
                          setSelectedElement(m);
                          setActiveMarker(marker);
                        }}
                      // lat={m.latitude}
                      // lng={m.longitude}
                      />
                    )
                  })
                }
                {selectedElement ? (
                  <InfoWindow
                    visible={showInfoWindow}
                    marker={activeMarker}
                    onCloseClick={() => {
                      setSelectedElement(null);
                    }}
                  >
                    <div className='info__window'>
                      <h5>{selectedElement.station_name}</h5>
                      <hr />
                      <h5>{selectedElement.description}</h5>
                      <h3>Hybrid (Docks and free-floating)</h3>
                      <p>{selectedElement.num_bike + " bicycles " + " in "} {selectedElement.num_docks + " stations"}</p>
                    </div>
                  </InfoWindow>
                ) : null}
                {/* <CurrentMaker
                  lat={latitude}
                  lng={longitude}
                  text="my marker"
                /> */}
              </Map>
            </div>
          </div>
        </div>

      </div>
    </div>
  ) : <GoogleMap />;
}
export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY
})(GoogleMapArabic);
// export default GoogleMap