<template>
    <div id="app">
        <WeatherCard v-if="forecast" v-bind:forecast="forecast" />
    </div>
</template>

<script>
import axios from 'axios';
import WeatherCard from './components/WeatherCard.vue';

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
    }
}
</script>

<style lang="scss">

</style>
