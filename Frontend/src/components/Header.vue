<template>
    <div class="navbar-expand-md">
        <div class="collapse navbar-collapse" id="navbar-menu">
            <div class="navbar navbar-light">
                <div class="container-xl">
                    <ul class="navbar-nav">
                        <router-link
                            active-class="active"
                            to="/"
                            class="nav-item"
                        >
                            <div class="nav-link">
                                <span
                                    class="
                                        nav-link-icon
                                        d-md-none d-lg-inline-block
                                    "
                                    ><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        ></path>
                                        <polyline
                                            points="5 12 3 12 12 3 21 12 19 12"
                                        ></polyline>
                                        <path
                                            d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"
                                        ></path>
                                        <path
                                            d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"
                                        ></path>
                                    </svg>
                                </span>
                                <span class="nav-link-title"> Home </span>
                            </div>
                        </router-link>

                        <router-link
                            active-class="active"
                            to="/shop"
                            class="nav-item"
                        >
                            <div class="nav-link">
                                <span
                                    class="
                                        nav-link-icon
                                        d-md-none d-lg-inline-block
                                    "
                                    ><!-- Download SVG icon from http://tabler-icons.io/i/file-text -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        ></path>
                                        <path
                                            d="M14 3v4a1 1 0 0 0 1 1h4"
                                        ></path>
                                        <path
                                            d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                                        ></path>
                                        <line
                                            x1="9"
                                            y1="9"
                                            x2="10"
                                            y2="9"
                                        ></line>
                                        <line
                                            x1="9"
                                            y1="13"
                                            x2="15"
                                            y2="13"
                                        ></line>
                                        <line
                                            x1="9"
                                            y1="17"
                                            x2="15"
                                            y2="17"
                                        ></line>
                                    </svg>
                                </span>
                                <span class="nav-link-title"> Shop </span>
                            </div>
                        </router-link>
                    </ul>
                    <div
                        class="
                            my-2 my-md-0
                            flex-grow-0 flex-md-grow-0
                            order-first order-md-last
                            d-flex
                        "
                    >
                        <form action="." method="get">
                            <div class="input-icon">
                                <span class="input-icon-addon">
                                    <!-- Download SVG icon from http://tabler-icons.io/i/search -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        ></path>
                                        <circle cx="10" cy="10" r="7"></circle>
                                        <line
                                            x1="21"
                                            y1="21"
                                            x2="15"
                                            y2="15"
                                        ></line>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Search…"
                                    aria-label="Search in website"
                                />
                            </div>
                        </form>
                        <Avatar
                            v-badge="productsInCart"
                            icon="pi pi-shopping-cart"
                            class="ml-4 cursor-pointer"
                            @click="toggleCartSidebar"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
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
