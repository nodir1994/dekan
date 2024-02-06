<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: "" });
</script>

<template>
  <div class="card panel-header-bg">
    <div class="card-body">
      <div class="panel-header">
        <slot name="title">
          <h5 class="card-title">{{ title }}</h5>
        </slot>
        <div class="panel-toggles">
          <div class="btn-group gap-3">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
