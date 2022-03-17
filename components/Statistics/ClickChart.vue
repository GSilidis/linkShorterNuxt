<script>
import { Bar } from 'vue-chartjs';
export default {
    extends: Bar,
    props: {
        labels: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
    },
    mounted () {
        this.renderFromProps();
    },
    methods: {
        renderFromProps () {
            this.renderChart({
                labels: this.labels,
                datasets: [
                    {
                        label: 'Click count',
                        backgroundColor: '#17a2b8',
                        data: this.data,
                    },
                ],
            }, { responsive: true, maintainAspectRatio: false });
        },
    },
};
</script>
