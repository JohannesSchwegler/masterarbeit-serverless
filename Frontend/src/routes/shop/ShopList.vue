<template>
    <div class="grid">
        <div class="col-12 lg:col-4">
            <div
                v-if="response.data"
                v-for="product in response.data.materials"
                :key="product.id"
                class="product-item"
            >
                <div class="product-item-content">
                    <div class="p-mb-3">
                        <img
                            :src="product.image"
                            :alt="product.name"
                            class="product-image"
                        />
                    </div>
                    <div>
                        <h4 class="text-xl pt-4">
                            {{ product.name }}
                        </h4>
                        <h6 class="text-xl mb-3">${{ product.price }}</h6>
                        <span
                            :class="
                                'product-badge status-' +
                                product.inventoryStatus.toLowerCase()
                            "
                            >{{ product.inventoryStatus }}</span
                        >
                        <div class="car-buttons p-mt-5">
                            <Button
                                icon="pi pi-shopping-cart"
                                class="p-button-success p-button-rounded p-mr-2"
                                @click="addProductToList(product)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import useCart from '../../store/Cart'
import ProductService from '../../services/ProductService'
import uiState from '../../store/uiState'
import useFetch from '@/shared/composables/useFetch'

export default {
    setup() {
        const response = useFetch<any[]>('http://localhost:3000/dev/material')

        const products = ref(null)
        const productService = ref(new ProductService())

        const { addProductToShoppingList } = useCart
        const { toggleCartSidebar, isCartSidebarOpen } = uiState

        const addProductToList = (product) => {
            addProductToShoppingList(product)
            console.log(isCartSidebarOpen)
            if (!isCartSidebarOpen.value) toggleCartSidebar()
        }

        return {
            response,
            productService,
            isCartSidebarOpen,
            addProductToList,
            toggleCartSidebar,
        }
    },
    updated() {
        console.log('updated shoplist')
    },
}
</script>

<style>
.list__grid {
    width: 100%;
    display: grid;
    grid-gap: 12px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}
</style>
