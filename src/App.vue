<script setup lang="ts">
    import allTricks from "@/allTricks.json";
    import Section from "./components/Section.vue";
    import AppBar from "./components/AppBar.vue";
    import { reactive, watch, onBeforeMount } from "vue";
    import { TricksLanded, getParsedData } from "./storageParser";

    // Tricks landed state.
    const tricksLanded = reactive<TricksLanded>({
        easy: { common: [] },
        medium: { frontside: [], backside: [] },
        hard: { frontside: [], backside: [] }
    });

    onBeforeMount(async () => {
        const parsedData = await getParsedData();

        // If there is saved data in localStorage save it to tricksLanded.
        if (parsedData) {
            for (const [key, landed] of Object.entries(parsedData)) {
                tricksLanded[key] = landed;
            }

            return;
        }

        // Start with no tricks landed, i.e. false.
        for (const [key, trickCollection] of Object.entries(allTricks)) {
            for (const [trickType, tricks] of Object.entries(trickCollection)) {
                tricksLanded[key][trickType] = new Array(tricks.length).fill(
                    false
                );
            }
        }
    });

    // Save tricks landed data to localStorage.
    watch(tricksLanded, (tricksLanded) =>
        localStorage.setItem("tricksLanded", JSON.stringify(tricksLanded))
    );
</script>

<template>
    <v-app>
        <AppBar :tricksLanded="tricksLanded" />

        <v-main>
            <!-- Render all three sections, with their respective tricks -->
            <Section
                v-for="(tricks, difficulty) in allTricks"
                :tricks="tricks"
                :header="difficulty"
                :tricksLanded="tricksLanded[difficulty]"
            />
        </v-main>
    </v-app>
</template>
