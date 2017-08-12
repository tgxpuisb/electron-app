<template>
    <div>{{ path.appData }}</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data () {
            return {

            }
        },
        computed: mapState('App', ['path'])
    }
</script>

<style>

</style>