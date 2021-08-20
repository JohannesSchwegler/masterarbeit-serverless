import { computed, reactive } from 'vue'

enum inventoryStatus {
    instock = 'INSTOCK',
    lowstock = 'LOWSTOCK',
    outofstock = 'OUTOFSTOCK',
}

export interface Product {
    id: string
    code: string
    name: string
    description: string
    image: string
    price: number
    category: string
    quantity: number
    inventoryStatus: inventoryStatus.lowstock
    rating: number
}

interface StateProps {
    products: Array<Product>
}

const state: StateProps = reactive({
    products: [],
})

const cartList = computed(() => state.products)
const productsInCart = computed(() => state.products.length)
const cartSumPrice = computed(() => {
    const pricesArray = state.products.map((product) => product.price)
    return pricesArray.length > 0
        ? pricesArray.reduce((acc = 0, price) => {
              return acc + price
          })
        : 0
})

const addProductToShoppingList = (product: Product) => {
    state.products = [product, ...state.products]
}

const useCart = {
    cartList,
    cartSumPrice,
    productsInCart,
    addProductToShoppingList,
}

export default useCart
