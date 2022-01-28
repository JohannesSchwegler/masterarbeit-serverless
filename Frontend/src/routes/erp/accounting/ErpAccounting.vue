<template>
    <DataTable
        v-if="response.data && response.data.accountings"
        :value="response.data.accountings"
    >
        <Column field="id" header="ID"></Column>
        <Column field="customerId" header="Kunden ID"></Column>

        <Column field="amount" header="Amount"></Column>
    </DataTable>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import ErpSection from '@/routes/erp/ErpSection.vue'
import useFetch from '@/shared/composables/useFetch'

export default defineComponent({
    components: { ErpSection },
    setup() {
        console.log('!!! accounting')
        const response = useFetch<any[]>(
            `${import.meta.env.VITE_APP_URL}/dev/accounting`
        )

        return { response }
    },
})
</script>
