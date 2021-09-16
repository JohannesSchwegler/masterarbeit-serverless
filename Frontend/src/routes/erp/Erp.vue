<template>
    <div :class="$style.erp">
        <div :class="$style.erp__container">
            <ERPSection> </ERPSection>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ERPSection from './ErpSection.vue'

export default defineComponent({
    components: {
        ERPSection,
    },
    setup() {
        const services = ref([
            {
                name: 'Kunde',
                url: '/erp/customer',
            },
            {
                name: 'Materialwirtschaft',
                url: '/erp/materials-management',
            },
            {
                name: 'Controlling',
                url: '/erp/controlling',
            },
        ])

        return { services }
    },
})
</script>

<style module lang="scss">
.erp {
    padding: 5rem 0;
    background: #edeef7;
    min-height: 100vh;

    &__container {
        max-width: 1200px;
        margin: 0 auto;
    }
}
</style>
