<template>
    <div class="generated-data-form-container">
        <h2 class="font-weight-bold mb-3">Your short URL generated</h2>
        <b-form>
            <b-input-group prepend="Short link:">
                <b-form-input
                    readonly
                    :value="shortLink"
                    @click.prevent="onInputClick"
                />
            </b-input-group>
            <b-input-group
                prepend="Statistics link:"
                class="mt-2"
            >
                <b-form-input
                    readonly
                    :value="statisticsLink"
                    @click.prevent="onInputClick"
                />
            </b-input-group>
            <button
                class="btn btn-primary btn-lg px-4 mt-3 w-75"
                @click.prevent="onResetClick"
            >
                Shorten another URL
            </button>
        </b-form>
    </div>
</template>

<script>
export default {
    props: {
        shortLink: {
            type: String,
            required: true,
        },
        statisticsLink: {
            type: String,
            required: true,
        },
    },

    methods: {
        onInputClick (event) {
            event.target.setSelectionRange(0, event.target.value.length);
        },

        onResetClick () {
            this.$emit('reset');
        },
    },
};
</script>

<style lang="scss" scoped>
.input-group-text {
    width: 130px;
    display: flex;
    justify-content: flex-end;
}
</style>
