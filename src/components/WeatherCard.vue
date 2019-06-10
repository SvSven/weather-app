<template>
    <div class="weather box">
        <div class="weather__header">
            <h1 class="weather__header__title">{{ forecast.location.name }}</h1>
            <time :datetime="forecast.current.dt | ISODateTime(forecast.location.timezone)" class="weather__header__time">
                {{ forecast.current.dt | shortDateTime(forecast.location.timezone) }}
            </time>
        </div>

        <div class="weather__current weather__summary">
            <div class="weather__summary__icon">
                <img :src="`http://openweathermap.org/img/w/${forecast.current.weather[0].icon}.png`" alt="">
            </div>

            <h2 class="weather__summary__text">
                {{ forecast.current.main.temp | roundTemperature }}{{ forecast.units | unitSymbol }} {{ forecast.current.weather[0].main }}
            </h2>
        </div>

        <div class="weather__upcoming">
            <div v-for="(report, index) in forecast.upcoming.list.slice(0, 5)" v-bind:key="index" class="weather__upcoming__item weather__summary">
                <time class="weather__summary__time" :datetime="report.dt | ISODateTime(forecast.location.timezone)">
                    {{ report.dt | shortDateTime(forecast.location.timezone) }}
                </time>

                <div class="weather__summary__icon">
                    <img :src="`http://openweathermap.org/img/w/${report.weather[0].icon}.png`" alt="">
                </div>

                <h2 class="weather__summary__text">{{ report.main.temp | roundTemperature }}{{ forecast.units | unitSymbol }}</h2>
                <h2 class="weather__summary__text">{{ report.weather[0].main }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
    name: 'WeatherCard',
    props: {
        forecast: {
            type: Object,
            required: true
        }
    },
    filters: {
        roundTemperature: function(temp) {
            return Number.parseFloat(temp).toFixed(1);
        },
        shortDateTime: function(dt, timezone) {
            const date = moment.unix(dt).utc();
            return date.tz(timezone).format("ddd MMMM Do, HH:mm");
        },
        ISODateTime: function(dt, timezone) {
            const date = moment.unix(dt).utc();
            return date.tz(timezone).format();
        },
        unitSymbol: function(unit) {
            if (unit === 'metric') {
                return '℃';
            } else if (unit === 'imperial') {
                return '℉';
            } else {
                return '°';
            }
        }
    }
}
</script>

<style scoped lang="scss">
    $border-color: #d3d3d3;

    .weather {

        &__header {
            &__title {
                font-size: 24px;
            }
        }

        &__current {
            margin: 3px 0 20px 0;

            .weather__summary__text {
                font-size: 48px;
            }
        }

        &__summary {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            &__time {
                width: 100%;
            }

            &__icon {
                margin-right: 5px;
            }

            &__text {
                font-size: 24px;
            }
        }

        &__upcoming {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;

            @media (min-width: 550px) {
                grid-template-columns: repeat(3, 1fr);
            }

            @media (min-width: 750px) {
                grid-template-columns: repeat(4, 1fr);
            }

            @media (min-width: 950px) {
                grid-template-columns: repeat(5, 1fr);
            }

            &__item {
                padding: 10px;
                border: solid 1px $border-color;
            }

            .weather__summary {
                flex-direction: column;

                &__time {
                    text-align: center;
                    margin-bottom: 5px;
                    padding-bottom: 5px;
                    border-bottom: solid 1px $border-color;
                }
            }
        }
    }
</style>
