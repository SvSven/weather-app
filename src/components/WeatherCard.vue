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

        <div class="weather__upcoming">

            <div v-for="(report, index) in upcoming.slice(0, 5)" v-bind:key="index" class="weather__upcoming__item weather__summary">

                <p class="weather__summary__time">{{ report.dt_txt }}</p>

                <div class="weather__summary__icon">
                    <img :src="`http://openweathermap.org/img/w/${report.weather[0].icon}.png`" alt="">
                </div>

                <h2 class="weather__summary__text">{{ report.main.temp | roundTemperature }}&deg; {{ report.weather[0].main }}</h2>
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
    data () {
        return {
            current: this.forecast.current,
            upcoming: this.forecast.upcoming.list
        }
    },
    beforeUpdate: function() {
        this.$set(this, 'current', this.forecast.current);
        this.$set(this, 'upcoming', this.forecast.upcoming.list);
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
        }
    }
}
</script>

<style scoped lang="scss">
    .weather {
        margin: 50px 0;

        &__header {
            &__title {
                font-size: 24px;
            }
        }

        &__current {
            margin: 3px 0 20px 0;
            padding-bottom: 20px;
            border-bottom: solid 2px #d3d3d3;

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
            display: flex;
            justify-content: space-between;

            .weather__summary {
                justify-content: center;

                &__time {
                    text-align: center;
                }
            }

            &__item:not(:last-child) {
                margin-right: 15px;
            }
        }
    }
</style>
