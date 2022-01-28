<template>
    <div class="container">
        <Message v-if="showSuccessMessage" severity="info"
            >Bestellung wurde aufgegeben</Message
        >
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

<script lang="ts">
import { ref } from 'vue'
import useCart from '../../store/Cart'
import Product from '../../components/Product.vue'
import { useToast } from 'primevue/usetoast'
export default {
    components: { Product },

    setup() {
        const usernumber = ref('')
        const showSuccessMessage = ref(false)

        const { cartList } = useCart

        const onFinishOrder = async () => {
            console.log(cartList.value[0])
            // Default options are marked with *
            fetch('http://localhost:3000/dev/saleOrderProcessing', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: usernumber.value,
                    materialId: cartList.value[0].id,
                }), // body data type must match "Content-Type" header
            })
                .then((data) => {
                    console.log(data)

                    showSuccessMessage.value = true
                })
                .catch((err) => console.log(err))
        }

        return { usernumber, showSuccessMessage, cartList, onFinishOrder }
    },
}
</script>

<style></style>
