<template>
    <Menubar>
        <template #start>
            <img
                alt="logo"
                src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                height="40"
                class="p-mr-2"
            />
        </template>
        <template #end>
            <Avatar
                @click="toggleCartSidebar"
                icon="pi pi-shopping-cart"
                v-badge="productsInCart"
            />
            <InputText placeholder="Search" type="text" />
        </template>
    </Menubar>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import uiState from '../store/uiState'
import Cart from '../store/Cart'

export default {
    setup() {
        const { toggleCartSidebar } = uiState
        const { productsInCart } = Cart
        return { toggleCartSidebar, productsInCart }
    },
}
</script>
