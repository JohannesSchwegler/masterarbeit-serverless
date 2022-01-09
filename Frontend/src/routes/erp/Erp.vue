<template>
    <div class="page-wrapper">
        <div class="container-xl">
            <!-- Page title -->
            <div class="page-header d-print-none">
                <div class="row align-items-center">
                    <div class="col">
                        <h2 class="page-title">Dashboard</h2>
                    </div>
                    <!-- Page title actions -->
                    <div class="col-auto ms-auto d-print-none">
                        <div class="btn-list">
                            <span class="d-none d-sm-inline">
                                <a href="#" class="btn btn-white"> New view </a>
                            </span>
                            <a
                                href="#"
                                class="btn btn-primary d-none d-sm-inline-block"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-report"
                            >
                                <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    ></path>
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Create new report
                            </a>
                            <a
                                href="#"
                                class="btn btn-primary d-sm-none btn-icon"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-report"
                                aria-label="Create new report"
                            >
                                <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    ></path>
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-body">
            <div class="container-xl">
                <div class="row row-deck row-cards">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title font-weight-bold">
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
import axios from 'axios'
export default defineComponent({
    components: {
        ErpAccounting,
        ErpCustomers,
        ErpMaterialsmanagement,
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

        const restoreDefault = () => {
            console.log('restore')
            axios
                .post('http://localhost:3000/dev/restore')
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
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
