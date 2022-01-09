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
                <Button
                    class="mt-4"
                    label="Bestellung buchen"
                    @click="onFinishOrder"
                />
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
        const usernumber = ref('')

        const { cartList } = useCart

        const onFinishOrder = async () => {
            console.log(cartList.value[0])
            // Default options are marked with *
            const response = await fetch('http://localhost:3000/dev/order', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: usernumber.value,
                    materialId: cartList.value[0].id,
                }), // body data type must match "Content-Type" header
            })
            return response.json() // parses JSON response into native JavaScript objects
        }

        return { usernumber, cartList, onFinishOrder }
    },
}
</script>

<style></style>
