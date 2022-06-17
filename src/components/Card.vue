<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
import { Vue } from "vue-class-component";

export default class Card extends Vue {
};
</script>

<style scoped>

</style>