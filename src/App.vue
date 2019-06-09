<template>
    <div id="app">
        <WeatherCard v-if="forecast.current && forecast.upcoming" v-bind:forecast="forecast" />
    </div>
</template>

<script>
import axios from 'axios';
import WeatherCard from './components/WeatherCard.vue';
import { API } from './env.config.js';

export default {
    name: 'app',
    components: {
        WeatherCard
    },
    data () {
        return {
            IP_INFO: null,
            forecast: {
                location: {
                    name: null,
                    lat: null,
                    lng: null
                },
                current: null,
                upcoming: null
            }
        }
    },
    mounted: function() {
        axios.get('https://get.geojs.io/v1/ip/geo.json').then(response => {
            this.IP_INFO = response.data;

            this.forecast.location.name = this.IP_INFO.city + ', ' + this.IP_INFO.country;
            this.forecast.location.lat = this.IP_INFO.latitude;
            this.forecast.location.lng = this.IP_INFO.longitude;

            this.getWeather(this.IP_INFO.latitude, this.IP_INFO.longitude);
        });
    },
    methods: {
        getWeather: function(lat, lng) {
            const params = {
                lat: lat,
                lon: lng,
                units: 'metric',
                appid: API.open_weather_map.key
            }

            axios.get(API.open_weather_map.url + 'weather', { params: params }).then(response => {
                this.forecast.current = response.data;
                return axios.get(API.open_weather_map.url + 'forecast', { params: params })
            }).then(response => {
                this.forecast.upcoming = response.data;
            });
        },
        forwardGeocode: function(location) {
            const params = {
                q: location,
                key: API.geocode.key
            }

            return axios.get(API.geocode.url, { params: params }).then(response => {
                if (response.data.total_results > 0) {
                    return response.data;
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss">

</style>
