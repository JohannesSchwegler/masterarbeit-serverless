<template>
    <div :class="$style.section">
        <div :class="$style.section__isLoading" v-if="isLoading">
            <ProgressBar mode="indeterminate" />
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        isLoading: {
            default: false,
            required: false,
        },
    },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module lang="scss">
.section {
    display: flex;
    flex: 1 1 auto;
    position: relative;
    flex-direction: column;
    border: 1px solid rgb(236, 239, 241);
    border-radius: 4px;
    box-shadow: rgba(17, 51, 83, 0.05) 0px 4px 12px 0px;
    overflow: hidden;
    background: rgb(255, 255, 255);
    min-height: 400px;
    padding-top: 4px;
    margin-bottom: 50px;

    &__isLoading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
