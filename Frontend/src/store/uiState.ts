import { reactive, computed } from 'vue'

const state = reactive({
    isCartSidebarOpen: false,
    isLoginModalOpen: false,
})

const isCartSidebarOpen = computed(() => state.isCartSidebarOpen)
const toggleCartSidebar = () => {
    state.isCartSidebarOpen = !state.isCartSidebarOpen
}

const isLoginModalOpen = computed(() => state.isLoginModalOpen)
const toggleLoginModal = () => {
    state.isLoginModalOpen = !state.isLoginModalOpen
}

const uiState = {
    isCartSidebarOpen,
    isLoginModalOpen,
    toggleCartSidebar,
    toggleLoginModal,
    state,
}

export default uiState
