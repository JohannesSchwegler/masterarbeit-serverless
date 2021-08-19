<template>
    <Sidebar v-model:visible="state.isCartSidebarOpen" :baseZIndex="1000">
        <div v-for="product in cartList" :key="product.id" class="product-item">
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
                            icon="pi pi-shopping-cart"
                            class="p-button-success p-button-rounded p-mr-2"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <p>Summe:</p>
            {{ cartSumPrice }}
        </div>
        <Button> <router-link to="/checkout">Checkout</router-link></Button>
    </Sidebar>
    <div class="card">
        <Carousel
            :value="products"
            :numVisible="3"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
            class="custom-carousel"
            :circular="true"
            :autoplayInterval="6000"
        >
            <template #item="slotProps">
                <div class="product-item">
                    <div class="product-item-content">
                        <div class="p-mb-3">
                            <img
                                :src="`https://primefaces.org/primevue/showcase/demo/images/product/${slotProps.data.image}`"
                                :alt="slotProps.data.name"
                                class="product-image"
                            />
                        </div>
                        <div>
                            <h4 class="p-mb-1">{{ slotProps.data.name }}</h4>
                            <h6 class="p-mt-0 p-mb-3">
                                ${{ slotProps.data.price }}
                            </h6>
                            <span
                                :class="
                                    'product-badge status-' +
                                    slotProps.data.inventoryStatus.toLowerCase()
                                "
                                >{{ slotProps.data.inventoryStatus }}</span
                            >
                            <div class="car-buttons p-mt-5">
                                <Button
                                    icon="pi pi-shopping-cart"
                                    class="
                                        p-button-success p-button-rounded p-mr-2
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import ProductService from '../../services/ProductService'
import uiState from '../../store/uiState'
import Cart from '../../store/Cart'

export default {
    setup() {
        onMounted(() => {
            products.value = productService.value
                .getProductsSmall()
                .splice(0, 9)
        })
        const products = ref(null)
        const productService = ref(new ProductService())
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
    updated() {
        console.log('updated shop')
    },
}
</script>

<style>
.p-carousel-items-container {
    transition: all 1s cubic-bezier(0.19, 1, 0.22, 1) !important;
}
</style>
