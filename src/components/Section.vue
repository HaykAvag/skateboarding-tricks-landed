<script setup lang="ts">
    import Container from "./Container.vue";
    import TrickList from "./TrickList.vue";
    import easy from "@/assets/easy.jpg";
    import medium from "@/assets/medium.jpg";
    import hard from "@/assets/hard.jpg";

    type Trick = { title: string; subtitle: string };

    defineProps<{
        tricks: Record<string, Trick[]>;
        tricksLanded: Record<string, boolean[]>;
        header: string;
    }>();

    const images: Record<string, string> = { easy, medium, hard };
</script>

<template>
    <section class="section">
        <h1>{{ header }}</h1>
        <img :src="images[header]" />

        <div class="gradient"></div>

        <Container>
            <!-- Loop and render common, frontside, and backside tricks -->
            <TrickList
                v-for="(trickList, type) in tricks"
                :key="type"
                :tricks="trickList"
                :header="type"
                :difficulty="header"
                :tricksLanded="tricksLanded[type]"
            />
        </Container>
    </section>
</template>

<style scoped>
    .section {
        position: relative;
        overflow: hidden;
        padding: 20px 0;
        display: flex;

        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    /* Gradient with blur for image separation and backdrop */
    .gradient {
        z-index: 1;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        backdrop-filter: blur(2px);

        background: linear-gradient(
            rgb(55, 55, 55) 0%,
            rgba(55, 55, 55, 0) 30%,
            rgba(55, 55, 55, 0) 70%,
            rgba(55, 55, 55, 1) 100%
        );
    }
    .section:first-of-type .gradient:first {
        background: linear-gradient(
            rgba(55, 55, 55, 0) 70%,
            rgba(55, 55, 55, 1) 100%
        );
    }

    /* Backdrop grayscale image fitting the dark theme */
    .section img {
        position: absolute;
        z-index: 0;
        width: 100%;
        min-width: 900px;
        opacity: 0.2;
        filter: grayscale(1);
    }

    h1 {
        position: relative;
        text-transform: capitalize;
        margin: 8px 0px;
        z-index: 2;
    }

    h1:first-of-type {
        margin-top: 8px;
    }
</style>
