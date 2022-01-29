<template>
    <div class="page-wrapper">
        <div class="container-xl"></div>

        <div class="page-body">
            <div class="container-xl">
                <div class="row row-deck row-cards">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3
                                    style="fontweight: bold"
                                    class="card-title font-weight-bold"
                                >
                                    Materialwirtschaft
                                </h3>
                            </div>
                            <ErpMaterialsmanagement />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title font-weight-bold">
                                    Kunden
                                </h3>
                            </div>
                            <ErpCustomers />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title font-weight-bold">
                                    Sale Order
                                </h3>
                            </div>
                            <ErpSaleOrder />
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title font-weight-bold">
                                    Accounting
                                </h3>
                            </div>
                            <ErpAccounting />
                        </div>
                    </div>

                    <div>
                        <Button @click="restoreDefault" label="Reset"
                            >Reset and restore default</Button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ERPSection from './ErpSection.vue'
import ErpMaterialsmanagement from '@/routes/erp/material-management/ErpMaterialsmanagement.vue'
import ErpCustomers from '@/routes/erp/customers/ErpCustomers.vue'
import ErpAccounting from '@/routes/erp/accounting/ErpAccounting.vue'
import ErpSaleOrder from '@/routes/erp/sale-order/ErpSaleOrder.vue'
import axios from 'axios'
import SaleOrder from './sale-order/ErpSaleOrder.vue'
import { useToast } from 'primevue/usetoast'

export default defineComponent({
    components: {
        ErpAccounting,
        ErpCustomers,
        ErpMaterialsmanagement,
        ERPSection,
        ErpSaleOrder,
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

        const restoreDefault = () => {
            axios
                .post(`${import.meta.env.VITE_APP_URL}/dev/reset`)
                .then(() => location.reload())

                .catch(function (error) {
                    new Error(error)
                })
        }

        return { services, restoreDefault }
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
