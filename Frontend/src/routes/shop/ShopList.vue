<template>
    test: {{ isLoginModalOpen }}

    <button @click="toggleLoginModal">toggle</button>
    <div class="list__grid">
        <div v-for="product in products" :key="product.id" class="product-item">
            <div class="product-item-content">
                <div class="p-mb-3">
                    <img
                        :src="`https://primefaces.org/primevue/showcase/demo/images/product/${product.image}`"
                        :alt="product.name"
                        class="product-image"
                    />
                </div>
                <div>
                    <h4 class="p-mb-1">{{ product.name }}</h4>
                    <h6 class="p-mt-0 p-mb-3">${{ product.price }}</h6>
                    <span
                        :class="
                            'product-badge status-' +
                            product.inventoryStatus.toLowerCase()
                        "
                        >{{ product.inventoryStatus }}</span
                    >
                    <div class="car-buttons p-mt-5">
                        <Button
                            @click="addProductToList(product)"
                            icon="pi pi-shopping-cart"
                            class="p-button-success p-button-rounded p-mr-2"
                        />
                    </div>
                </div>
            </div>
        </div>

        <Dialog
            header="Header"
            v-model:visible="displayBasic"
            :style="{ width: '50vw' }"
        >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <template #footer>
                <Button
                    label="No"
                    icon="pi pi-times"
                    @click="closeBasic"
                    class="p-button-text"
                />
                <Button
                    label="Yes"
                    icon="pi pi-check"
                    @click="closeBasic"
                    autofocus
                />
            </template>
        </Dialog>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import useCart from '../../store/Cart'
import ProductService from '../../services/ProductService'
import uiState from '../../store/uiState'

export default {
    setup() {
        onMounted(() => {
            products.value = productService.value
                .getProductsSmall()
                .splice(9, 18)
        })
        const products = ref(null)
        const productService = ref(new ProductService())

        const { addProductToShoppingList } = useCart
        const {
            isLoginModalOpen,
            toggleLoginModal,
            toggleCartSidebar,
            isCartSidebarOpen,
        } = uiState

        const addProductToList = (product) => {
            addProductToShoppingList(product)
            if (!isCartSidebarOpen.value) toggleCartSidebar()
        }

        return { products, productService, addProductToList, toggleCartSidebar }
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
