<template>
    <div class="delete-button-container">
        <button
            class="btn btn-danger btn-lg col-md-4 my-2"
            @click.prevent="onDeleteClick"
        >
            Delete link
        </button>

        <b-modal
            v-model="deletionModalShown"
            hide-footer
            hide-header-close
            title="Deleting short link"
            @hide="handleModalClose"
        >
            <div class="d-block text-center">
                <div v-if="error">
                    <h3>Error:</h3>
                    <p>{{ error }}</p>
                    <b-button
                        class="mt-3"
                        variant="secondary"
                        block
                        @click="handleModalClose"
                    >
                        OK
                    </b-button>
                </div>
                <div v-else-if="isDeleted">
                    <h3>Deleted successfully</h3>
                    <b-button
                        class="mt-3"
                        variant="success"
                        block
                        @click="handleSuccessfulLinkRemoval"
                    >
                        OK
                    </b-button>
                </div>
                <div v-else-if="isDeleting">
                    <h3>Please wait</h3>
                    <b-progress
                        :value="100"
                        animated
                        class="mt-3"
                    />
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        linkId: {
            type: Number,
            required: true,
        },
    },
    data () {
        return {
            isDeleting: false,
            isDeleted: false,
            error: null,
        };
    },
    computed: {
        deletionModalShown () {
            return this.isDeleting || this.isDeleted;
        },
    },
    methods: {
        _confirmDeletion () {
            return this.$bvModal.msgBoxConfirm('Are you sure wanting to delete this short link?', {
                okVariant: 'danger',
                okTitle: 'Delete',
            });
        },

        async onDeleteClick () {
            if (await this._confirmDeletion()) {
                this.isDeleting = true;

                try {
                    await this.$nuxt.context.$axios.$delete(`/api/link/${this.linkId}`);

                    this.isDeleted = true;
                    this.isDeleting = false;
                } catch (error) {
                    this.error = error.toString();
                }
            }
        },

        handleModalClose (event) {
            if (event.trigger === 'backdrop')
                event.preventDefault();
            else {
                this.isDeleting = false;
                this.isDeleted = false;
                this.error = null;
            }
        },

        handleSuccessfulLinkRemoval () {
            this.$router.replace('/');
        },
    },
};
</script>
