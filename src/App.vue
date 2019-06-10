<template>
    <div id="app">
        <div class="field search-field box">
            <h1 class="title is-2">Weather forecast</h1>
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
            <div class="field">
                <input
                    class="is-checkradio"
                    id="temperatureMetric"
                    type="radio"
                    name="temperatureUnit"
                    value="metric"
                    v-model="forecast.units">
                <label for="temperatureMetric">Celsius</label>

                <input
                    class="is-checkradio"
                    id="temperatureImperial"
                    type="radio"
                    name="temperatureUnit"
                    value="imperial"
                    v-model="forecast.units">
                <label for="temperatureImperial">Fahrenheit</label>
            </div>
            <p ref="searchInputHelp" class="help is-danger"></p>
        </div>
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
                    lng: null,
                    timezone: null
                },
                current: null,
                upcoming: null,
                units: 'metric'
            },
        }
    },
    mounted: function() {
        axios.get('https://get.geojs.io/v1/ip/geo.json').then(response => {
            this.IP_INFO = response.data;

            const location = this.IP_INFO.city + ',' + this.IP_INFO.region + ',' + this.IP_INFO.country;
            this.forwardGeocode(location).then(response => {
                this.getWeather();
            });
        });
    },
    methods: {
        getWeather: function() {
            const params = {
                lat: this.forecast.location.lat,
                lon: this.forecast.location.lng,
                units: this.forecast.units,
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
                    this.getWeather();
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
    @import "bulma/sass/utilities/_all.sass";
    @import "bulma/sass/base/_all.sass";
    @import "bulma/sass/form/_all.sass";
    @import "bulma/sass/elements/box.sass";
    @import "bulma/sass/elements/button.sass";
    @import "bulma/sass/elements/title.sass";
    @import "bulma-checkradio/dist/css/bulma-checkradio.sass";

    html, body {
        width: 100%;
        height: 100%;
    }

    html {
        background: url(https://source.unsplash.com/1600x900/?nature,water,mountain,beach,forest) no-repeat center center fixed;
        background-size: cover;
    }

    #app {
        padding: 50px 0 50px;
        width: 90%;
        max-width: 960px;
        margin: auto;
    }

    .search-field {
        padding-bottom: 10px;
    }
</style>
