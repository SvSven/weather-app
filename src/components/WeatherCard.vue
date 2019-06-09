<template>
    <div>

    </div>
</template>

<script>

export default {
    name: 'WeatherCard',
    props: {
        forecast: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            current: this.forecast.current,
            upcoming: this.forecast.upcoming.list
        }
    }
}
</script>

<style scoped lang="scss">

</style>
