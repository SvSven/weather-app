<template>
    <div id="app">
        <div class="container">
            <WeatherCard v-if="forecast.current && forecast.upcoming" v-bind:forecast="forecast" />
            <div class="field search-field">
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input ref="searchInput" class="input" type="text" placeholder="Search for a location" v-on:keyup.enter="searchLocation">
                    </div>
                    <div class="control">
                        <a class="button is-info" v-on:click="searchLocation">
                            Search
                        </a>
                    </div>
                </div>
                <p ref="searchInputHelp" class="help is-danger"></p>
            </div>
        </div>
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
                    lng: null,
                    timezone: null
                },
                current: null,
                upcoming: null
            }
        }
    },
    mounted: function() {
        axios.get('https://get.geojs.io/v1/ip/geo.json').then(response => {
            this.IP_INFO = response.data;

            const location = this.IP_INFO.city + ',' + this.IP_INFO.region + ',' + this.IP_INFO.country;
            this.forwardGeocode(location).then(response => {
                this.getWeather(this.forecast.location.lat, this.forecast.location.lng);
            });
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
                this.$set(this.forecast, 'current', response.data);
                return axios.get(API.open_weather_map.url + 'forecast', { params: params })
            }).then(response => {
                this.$set(this.forecast, 'upcoming', response.data);
            });
        },
        searchLocation: function() {
            const location = this.$refs.searchInput.value;
            this.$refs.searchInputHelp.innerHTML = '';

            if (!location) {
                this.$refs.searchInputHelp.innerHTML = 'You must provide a location first.';
                return false;
            }

            this.forwardGeocode(location).then(response => {
                if (response) {
                    this.getWeather(this.forecast.location.lat, this.forecast.location.lng);
                } else {
                    this.$refs.searchInputHelp.innerHTML = 'We were unable to find that location.';
                    return false;
                }
            });
        },
        forwardGeocode: function(location) {
            const params = {
                q: location,
                key: API.geocode.key
            }

            return axios.get(API.geocode.url, { params: params }).then(response => {
                if (response.data.total_results > 0) {
                    const location = response.data.results[0];
                    this.forecast.location.name = location.formatted;
                    this.forecast.location.lat = location.geometry.lat;
                    this.forecast.location.lng = location.geometry.lng;
                    this.forecast.location.timezone = location.annotations.timezone.name;

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
