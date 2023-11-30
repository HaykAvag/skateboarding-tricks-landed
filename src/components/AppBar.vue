<script setup lang="ts">
    import { TricksLanded } from "@/storageParser";
    import { computed } from "vue";

    const props = defineProps<{ tricksLanded: TricksLanded }>();

    const tricksLandedCount = computed(() => {
        let count = 0;

        // Count the number of true booleans in descending arrays.
        for (const tricksLanded of Object.values(props.tricksLanded)) {
            for (const landed of Object.values(tricksLanded)) {
                for (let i = 0; i < landed.length; i++) {
                    if (landed[i]) count++;
                }
            }
        }

        return count;
    });
</script>

<template>
    <v-app-bar>
        <v-app-bar-title class="text-center">
            {{ tricksLandedCount }} Skateboarding Tricks Landed
        </v-app-bar-title>
    </v-app-bar>
</template>
