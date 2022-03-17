<template>
    <div class="statistics-component-container">
        <div class="data-picker-container col-md-6 mx-auto">
            <date-picker
                v-model="timeRange"
                class="my-1 col-lg-8"
                :range="true"
                :editable="false"
            />
            <button
                :class="`btn my-1 col-lg-auto ${timeRangeSelected ? 'btn-primary' : 'btn-secondary'}`"
                :disabled="!timeRangeSelected"
                @click.prevent="onGetStatisticsClick"
            >
                Get
            </button>
        </div>
        <div class="chart-container">
            <div
                v-if="error"
                class="alert-danger rounded"
            >
                {{ error }}
            </div>
            <b-spinner
                v-else-if="isLoading"
                class="my-4"
                variant="primary"
                type="grow"
                label="Loading click data.."
            />
            <click-chart
                v-else-if="Object.keys(clickData).length"
                class="m-2 click-chart"
                :data="clickData.data"
                :labels="clickData.labels"
            />
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import ClickChart from '@/components/Statistics/ClickChart';

export default {
    components: {
        DatePicker,
        ClickChart,
    },
    props: {
        linkId: {
            type: Number,
            required: true,
        },
    },
    data () {
        return {
            timeRange: null,
            clickData: {},
            isLoading: false,
            error: null,
        };
    },
    computed: {
        timeRangeSelected () {
            return !!(this.timeRange && this.timeRange[0] && this.timeRange[1]);
        },
    },
    methods: {
        async onGetStatisticsClick () {
            this.clickData = {};
            this.error = null;
            this.isLoading = true;

            try {
                const statData = await this.$nuxt.context.$axios.$get(`/api/stats/${this.linkId}`, {
                    params: {
                        dateFrom: this.timeRange[0],
                        dateTo: this.timeRange[1],
                    },
                });

                const labels = [];
                const data = [];
                statData.forEach(date => {
                    labels.push(date.date);
                    data.push(date.click_count);
                });

                this.clickData = {
                    labels,
                    data,
                };
            } catch (error) {
                this.error = error.toString();
            }

            this.isLoading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.click-chart {
    max-height: 800px;
}
</style>
