<template>
    <!-- Container with auto-wrapping based on screen size. -->
    <v-container class="d-flex justify-center container">
        <slot></slot>
    </v-container>
</template>

<style scoped>
    .container {
        gap: max(15px, 1vw);
    }

    /* Wrap if content is too small to read side by side */
    @media (max-width: 800px) {
        .container {
            flex-wrap: wrap;
        }
    }
</style>