<template>
    <div class="weather">
        <div class="weather__header">
            <h1 class="weather__header__title">{{ forecast.location.name }}</h1>
        </div>

        <div class="weather__current weather__summary">
            <div class="weather__summary__icon">
                <img :src="`http://openweathermap.org/img/w/${current.weather[0].icon}.png`" alt="">
            </div>

            <h2 class="weather__summary__text">{{ current.main.temp | roundTemperature }}&deg; {{ current.weather[0].main }}</h2>
        </div>
        </div>
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
    },
    filters: {
        roundTemperature: function(temp) {
            return Number.parseFloat(temp).toFixed(1);
        }
    }
}
</script>

<style scoped lang="scss">
    .weather {
        margin: 50px 0;

        &__header {
            &__title {
                font-size: 28px;
            }
        }

        &__current {
            margin-top: 5px;
        }

        &__summary {
            display: flex;
            align-items: center;

            &__icon {
                margin-right: 5px;
            }

            &__text {
                font-size: 24px;
            }
        }
    }
</style>
