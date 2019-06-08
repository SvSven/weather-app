<template>
    <div id="app">

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'app',
    components: {

    },
    data () {
        return {
            IP_INFO: null
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
