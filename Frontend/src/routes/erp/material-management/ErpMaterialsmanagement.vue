<template>
    <div :class="$style.erp">
        <div :class="$style.erp__container">
            <ErpSection>
                <h1>Materials</h1>
                <div v-if="response && response.data">
                    <DataTable
                        :value="response.data.materials"
                        responsiveLayout="scroll"
                    >
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="category" header="Category"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                        <Column field="price" header="Price"></Column>
                    </DataTable>
                </div>


            </ErpSection>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import ErpSection from '@/routes/erp/ErpSection.vue'
import useFetch from '@/shared/composables/useFetch'


export default defineComponent({
    components: {ErpSection},
    setup() {

        const response = useFetch<any[]>("http://localhost:3000/dev/material")

        const materials = computed(() => response.data)


        return {response}
    }

})
</script>

<style
    module
    lang="scss"
>
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
