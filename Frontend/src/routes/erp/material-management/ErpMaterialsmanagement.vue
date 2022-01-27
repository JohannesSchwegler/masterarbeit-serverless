<template>
    <DataTable
        v-if="response.data && response.data.materials"
        :value="response.data.materials"
    >
        <Column field="image" header="Image">
            <template #body="{ data }">
                <img :src="data.image" width="30" /> </template
        ></Column>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="price" header="Preis"></Column>
        <Column field="quantity" header="Menge"></Column>
    </DataTable>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import ErpSection from '@/routes/erp/ErpSection.vue'
import useFetch from '@/shared/composables/useFetch'

export default defineComponent({
    components: { ErpSection },
    setup() {
        const response = useFetch<any[]>('http://localhost:3000/dev/material')

        return { response }
    },
})
</script>

<style module lang="scss">
.erp {
}
</style>
