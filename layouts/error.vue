<template>
    <div class="px-4 py-5 my-5 text-center">
        <h1 class="display-5 fw-bold"> {{ error.statusCode }} </h1>
        <h2>{{ error.message }}</h2>
        <nuxt-link to="/">Home page</nuxt-link>
    </div>
</template>

<script>
export default {
    layout: 'default',
    props: {
        error: {
            type: Object,
            required: true,
        },
    },
    head: {
        title: 'Error occurred',
    },
};
</script>
