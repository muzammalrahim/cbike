import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
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
          <div className='col-md-8'>
            <div className='map'>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
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
                      <Markers key={i} lat={m.latitude}
                        lng={m.longitude} />
                    )
                  })
                }
                <CurrentMaker
                  lat={latitude}
                  lng={longitude}
                  text="my marker"
                />
              </GoogleMapReact>
            </div>
          </div>
          <div className='col-md-4 station'>
            <div className='station__heading'>
              <h2>{t.googleMap.station}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  ) : <GoogleMap />;
}
export default GoogleMapArabic