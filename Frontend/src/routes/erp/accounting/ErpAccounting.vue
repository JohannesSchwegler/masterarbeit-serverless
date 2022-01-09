<template>
    <table
        v-if="response && response.data"
        class="table card-table table-vcenter text-nowrap datatable"
    >
        <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>City</th>
                <th>E-Mail</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="customer in response.data.customers" :key="customer.pk">
                <td>
                    {{ customer.name }}
                </td>
                <td>
                    {{ customer.surname }}
                </td>
                <td>
                    {{ customer.age }}
                </td>
                <td>
                    {{ customer.city }}
                </td>
                <td>
                    {{ customer.email }}
                </td>
            </tr>
            <tr v-if="!response.data.customers.length">
                Keine Daten vorhanden
            </tr>
        </tbody>
    </table>
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
        // const response = useFetch<any[]>("http://localhost:3000/dev/customer")
        //
        //
        // return { response}
    },
})
</script>
