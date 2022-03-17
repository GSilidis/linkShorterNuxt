<template>
    <div class="generation-form-container">
        <h2 class="font-weight-bold mb-3">Insert the URL to be shortened</h2>
        <b-form
            inline
            @submit.prevent="onSubmit"
        >
            <b-input-group class="w-100">
                <b-form-input
                    ref="url-input"
                    v-model="url"
                    type="url"
                    placeholder="https://example.com"
                    required="required"
                />
                <b-input-group-append>
                    <b-button
                        type="submit"
                        :variant="isLoading ? 'secondary' : 'primary'"
                        :disabled="isLoading"
                    >
                        <span v-if="!isLoading">Shorten URL</span>
                        <b-icon-three-dots
                            v-else
                            animation="cylon"
                        />
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </b-form>
        <transition name="fade">
            <b-alert
                v-model="showErrorMessage"
                class="mt-3"
                variant="danger"
                dismissible
            >
                {{ error }}
            </b-alert>
        </transition>
    </div>
</template>

<script>
import { BIconThreeDots } from 'bootstrap-vue';

export default {
    components: {
        BIconThreeDots,
    },
    data () {
        return {
            url: '',
            error: null,
            showErrorMessage: false,
            isLoading: false,
        };
    },
    methods: {
        async onSubmit () {
            this.isLoading = true;

            try {
                const newLink = await this.$nuxt.context.$axios.$post('/api/link/', {
                    url: this.url,
                });

                this.$emit('generated', {
                    shortLink: newLink.short_link,
                    statisticsLink: newLink.statistics_link,
                });
            } catch (error) {
                this.showErrorMessage = true;
                this.error = error.toString();
            }

            this.isLoading = false;
        },
    },
};
</script>
