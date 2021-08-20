<template>
    <div class="product-item">
        <div class="product-item-content">
            <div class="p-mb-3">
                <img
                    :src="`https://primefaces.org/primevue/showcase/demo/images/product/${product.image}`"
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
                <div class="car-buttons p-mt-5">
                    <Button
                        icon="pi pi-shopping-cart"
                        class="p-button-success p-button-rounded p-mr-2"
                        @click="onProductClick"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Product } from '../store/Cart'
export default defineComponent({
    props: {
        product: {
            type: Object,
        },
    },
    methods: {
        onProductClick(product: Product): void {
            this.$emit('product-clicked', product)
        },
    },
})
</script>

<style scoped></style>
