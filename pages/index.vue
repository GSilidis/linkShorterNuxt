<template>
    <div class="index-container">
        <div class="px-4 py-5 my-5 text-center">
            <b-icon-link45deg
                class="d-block mx-auto mb-4 border border-info rounded"
                font-scale="5"
            />
            <h1 class="font-weight-bold">Shorten your urls</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi illo illum in, neque nisi nulla pariatur possimus quia, quo reiciendis reprehenderit sit ut, voluptatibus.</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <nuxt-link
                        class="btn btn-primary btn-lg px-4 gap-3"
                        to="/generate/"
                    >
                        Generate now
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { BIconLink45deg } from 'bootstrap-vue';

export default {
    components: {
        BIconLink45deg,
    },
};
</script>
