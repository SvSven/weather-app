<template>
    <div id="app">
        <WeatherCard v-if="forecast" v-bind:forecast="forecast" />
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
            forecast: null
        }
    },
    mounted: function() {
        axios.get('https://get.geojs.io/v1/ip/geo.json').then(response => {
            this.IP_INFO = response.data;
        });
    },
    methods: {
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
