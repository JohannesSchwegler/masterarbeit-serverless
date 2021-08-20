<template>
    <div class="container">
        <div class="py-7 grid">
            <div class="col-5">
                <h2>
                    Bitte geben Sie die Daten an um die Bestellung abzuschließen
                </h2>
                <div class="p-col-12">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user" />
                        </span>
                        <InputText
                            v-model="usernumber"
                            placeholder="Kundennummer"
                        />
                    </div>
                </div>
                <Button class="mt-4" label="Bestellung buchen" />
            </div>

            <div class="col-7">
                <h2>Zusammenfassung</h2>
                <div v-for="product in cartList" :key="product.id">
                    <Product :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import useCart from '../../store/Cart'
import Product from '../../components/Product.vue'

export default {
    components: { Product },
    setup() {
        const usernumber = ref()

        const { cartList } = useCart

        return { usernumber, cartList }
    },
}
</script>

<style></style>
