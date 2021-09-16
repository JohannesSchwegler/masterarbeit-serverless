<template>
    <div :class="$style.erp">
        <div :class="$style.erp__container">
            <ErpSection>
                <h1>Customers</h1>
                {{response}}{{customers}}

<!--                <DataTable :value="customers" responsiveLayout="scroll">-->
<!--                    <Column field="id" header="Code"></Column>-->

<!--                </DataTable>-->
            </ErpSection>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import ErpSection from '@/routes/erp/ErpSection.vue'
import useFetch from '@/shared/composables/useFetch'

interface Pokemon {
    url: string,
    name: string
}

export default defineComponent({
    components: {ErpSection},
    setup() {

        const response = useFetch<any[]>("http://localhost:3000/dev/customer")

        const customers = computed(()=> response.data)
        watch((response) => {
            console.log("watched")
        })



        return {customers, response}
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
