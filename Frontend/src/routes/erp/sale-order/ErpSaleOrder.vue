<template>
    <DataTable
        v-if="response.data && response.data.saleorders"
        :value="response.data.saleorders"
    >
        <Column field="id" header="ID"></Column>
        <Column field="customerId" header="Kunden ID"></Column>

        <Column field="materialId" header="Material ID"></Column>
    </DataTable>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import ErpSection from '@/routes/erp/ErpSection.vue'
import useFetch from '@/shared/composables/useFetch'

export default defineComponent({
    components: { ErpSection },
    setup() {
        const response = useFetch<any[]>(
            `${import.meta.env.VITE_APP_URL}/dev/saleorder`
        )

        return { response }
    },
})
</script>
