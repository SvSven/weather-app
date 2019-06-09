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
                current: null,
                upcoming: null
            }
        }
    },
    mounted: function() {
        axios.get('https://get.geojs.io/v1/ip/geo.json').then(response => {
            this.IP_INFO = response.data;
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
