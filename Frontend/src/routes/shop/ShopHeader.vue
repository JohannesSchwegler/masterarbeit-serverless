<template>
    <Sidebar v-model:visible="state.isCartSidebarOpen" :base-z-index="1000">
        <div
            v-for="product in cartList"
            :key="product.id"
            class="mb-5 p-3 border-solid border-1"
        >
            <div class="product-item-content">
                <div class="">
                    <img
                        :src="product.image"
                        :alt="product.name"
                        class="product-image"
                    />
                </div>
                <div>
                    <h4 class="p-mb-1">
                        {{ product.name }}
                    </h4>
                    <h6 class="p-mt-0 p-mb-3">${{ product.price }}</h6>
                    <span
                        :class="
                            'product-badge status-' +
                            product.inventoryStatus.toLowerCase()
                        "
                        >{{ product.inventoryStatus }}</span
                    >
                </div>
            </div>
        </div>

        <div v-if="cartList.length === 0" class="text-lg mb-4">
            <p class="mb-4">No products added yet</p>
            <Button class="text-0">
                <router-link
                    to="/shop"
                    class="text-0"
                    @click="toggleCartSidebar"
                >
                    Continue shopping
                </router-link>
            </Button>
        </div>

        <div v-if="cartList.length > 0">
            <div class="text-xl mb-4">
                <p class="mb-0">Summe:</p>
                <span class="font-bold">{{ cartSumPrice }} $</span>
            </div>
            <Button class="text-0">
                <router-link to="/shop/checkout" class="text-0">
                    Checkout
                </router-link>
            </Button>
        </div>
    </Sidebar>
</template>

<script>
import { ref, onMounted } from 'vue'
import ProductService from '../../services/ProductService'
import uiState from '../../store/uiState'
import Cart from '../../store/Cart'

export default {
    setup() {
        onMounted(() => {
            products.value = productService.getProductsSmall().splice(0, 9)
        })
        const products = ref(null)
        const productService = new ProductService()
        const responsiveOptions = ref([
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3,
            },
            {
                breakpoint: '600px',
                numVisible: 2,
                numScroll: 2,
            },
            {
                breakpoint: '480px',
                numVisible: 1,
                numScroll: 1,
            },
        ])
        const { state, toggleCartSidebar } = uiState

        const { cartList, cartSumPrice } = Cart
        return {
            products,
            productService,
            responsiveOptions,
            state,
            toggleCartSidebar,
            cartSumPrice,
            cartList,
        }
    },
}
</script>

<style>
.p-carousel-items-container {
    transition: all 1s cubic-bezier(0.19, 1, 0.22, 1) !important;
}
</style>
