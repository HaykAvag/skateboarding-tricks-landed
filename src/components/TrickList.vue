<script setup lang="ts">
    const props = defineProps<{
        tricks: { title: string; subtitle: string }[];
        tricksLanded: boolean[];
        difficulty: string;
        header?: string;
    }>();

    const toggleTrickLanded = (i: number) => {
        props.tricksLanded[i] = !props.tricksLanded[i];
    };

    // Difficulty colors.
    const cardColor: Record<string, string> = {
        easy: "green",
        medium: "yellow",
        hard: "red"
    };
</script>

<template>
    <v-card
        class="card rounded-lg"
        variant="tonal"
        height="350"
        width="100%"
        :color="cardColor[difficulty]"
    >
        <v-list :height="350" lines="three" class="list">
            <h4 v-if="header" class="ml-5 mt-2 mb-1">{{ header }}</h4>

            <v-list-item
                v-for="({ title, subtitle }, i) in tricks"
                :key="i"
                :title="title"
                :subtitle="subtitle"
                @click="toggleTrickLanded(i)"
            >
                <!-- Checkbox for toggling trick landed status -->
                <template v-slot:prepend>
                    <v-list-item-action start>
                        <v-checkbox-btn
                            :model-value="tricksLanded[i]"
                        ></v-checkbox-btn>
                    </v-list-item-action>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<style scoped>
    h4 {
        color: rgb(196, 196, 196);
        text-transform: capitalize;
        font-weight: normal;
    }

    .card {
        position: relative;
        z-index: 2;
    }

    .list {
        background: transparent;
    }
</style>
