<template>
    <div class="generator-container text-center">
        <div class="content-container border rounded col-lg-6 my-4 mx-auto shadow-sm h-md-250 px-4 py-4">
            <transition
                name="fade"
                mode="out-in"
            >
                <div
                    v-if="!generated"
                    key="submit-form"
                    class="form-container"
                >
                    <generation-form @generated="onGenerationFormSubmit" />
                </div>
                <div
                    v-else
                    key="result-form"
                    class="results-container"
                >
                    <generated-data-form
                        :short-link="linkData.shortLink"
                        :statistics-link="linkData.statisticsLink"
                        @reset="onReset"
                    />
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import GenerationForm from '@/components/Generate/GenerationForm';
import GeneratedDataForm from '@/components/Generate/GeneratedDataForm';

export default {
    components: {
        GenerationForm,
        GeneratedDataForm,
    },
    data () {
        return {
            generated: false,
            linkData: {
                shortLink: null,
                statisticsLink: null,
            },
        };
    },
    methods: {
        onGenerationFormSubmit (payload) {
            this.linkData.shortLink = payload.shortLink;
            this.linkData.statisticsLink = payload.statisticsLink;
            this.generated = true;
        },
        onReset () {
            this.generated = false;
            this.linkData.shortLink = null;
            this.linkData.statisticsLink = null;
        },
    },
};
</script>
