<template>
    <draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }" item-key="name">
        <template #item="{ element }">
            <li>
                <p>{{ element.name }}</p>
                <nested-draggable :tasks="element.tasks" />
            </li>
        </template>
    </draggable>
</template>
<script setup>
import draggable from "vuedraggable";

const props = defineProps({
    tasks: {
        required: true,
        type: Array
    }
});

</script>
<style scoped>
.dragArea {
    min-height: 50px;
    outline: 1px dashed;
}
</style>