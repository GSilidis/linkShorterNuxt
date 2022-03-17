<template>
    <div class="manage-container py-3 px-1 text-center">
        <h1 class="font-weight-bold">Manage</h1>
        <h2> Short link: <span class="underlined">{{ shortLink }}</span> </h2>
        <h3> Original link: <span class="underlined">{{ originalLink }}</span> </h3>
        <delete-link-button :link-id="id" />
        <div class="d-flex justify-content-center">
            <div class="statistics-holder mt-4 mx-2 py-1 col-xl-11 border rounded shadow-sm">
                <client-only>
                    <h4 class="mt-2">Statistics</h4>
                    <statistics-component :link-id="id" />
                    <template #placeholder>
                        <div class="mt-4">
                            <b-icon-arrow-clockwise
                                animation="spin"
                                font-scale="3"
                            />
                        </div>
                    </template>
                </client-only>
            </div>
        </div>
    </div>
</template>

<script>
import StatisticsComponent from '@/components/Statistics/StatisticsComponent';
import DeleteLinkButton from '@/components/Manage/DeleteLinkButton';
import { BIconArrowClockwise } from 'bootstrap-vue';
import 'vue2-datepicker/index.css';

export default {
    components: {
        StatisticsComponent,
        DeleteLinkButton,
        BIconArrowClockwise,
    },
    validate ({ params }) {
        return !!params.id;
    },
    async asyncData ({ $axios, req, params, error }) {
        const linkData = await $axios.get(`/api/link/fromStat/${params.id}`, {
            validateStatus: status => status === 200 || status === 404,
        });

        if (linkData.status === 404) {
            error({
                statusCode: 404,
                message: `Statistics ID ${params.id} does not exists`,
            });

            return { };
        } else {
            let shortLink;
            if (process.server) {
                shortLink = `${req.protocol}://${req.headers.host}/${linkData.data.short_link}`;
            } else {
                shortLink = `${window.location.protocol}//${window.location.host}/${linkData.data.short_link}`;
            }

            return {
                shortLink,
                originalLink: linkData.data.original_link,
                id: linkData.data.id,
            };
        }
    },
    computed: {
        pageId () {
            return this.$nuxt.context.params.id;
        },
    },
};
</script>

<style lang="scss" scoped>
.underlined {
    border-bottom: 2px solid #17a2b8;
}

.statistics-holder {
    min-height: 120px;
}
</style>
