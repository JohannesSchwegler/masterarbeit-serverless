<template>
    <DataTable
        v-if="response.data && response.data.customers"
        :value="response.data.customers"
    >
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="surname" header="Vorname"></Column>
        <Column field="age" header="Alter"></Column>
        <Column field="email" header="Mail"></Column>
    </DataTable>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import ErpSection from '@/routes/erp/ErpSection.vue'
import useFetch from '@/shared/composables/useFetch'

interface Pokemon {
    url: string
    name: string
}

export default defineComponent({
    components: { ErpSection },
    setup() {
        const response = useFetch<any[]>(
            `${import.meta.env.VITE_APP_URL}/dev/customer`
        )

        return { response }
    },
})
</script>

<style module lang="scss">
.erp {
}
</style>
