<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { iconsList } from "./data-fontawesome";

  const icons = ref(iconsList);
  const solid = ref("");
  const regular = ref("");
  const brand = ref("");

  onMounted(() => {
    for (let entry of icons) {
      if (entry.attributes.membership.free.length) {
        for (let value of entry.attributes.membership.free) {
          switch (value) {
            case "brands":
              brand.value +=
                '<div class="col-xl-3 col-lg-4 col-sm-6">\
                            <i class="fab fa-' +
                entry.id +
                '"></i> fab fa-' +
                entry.id +
                "\
                        </div>";
              break;
            case "solid":
              solid.value +=
                '<div class="col-xl-3 col-lg-4 col-sm-6">\
                      <i class="fas fa-' +
                entry.id +
                '"></i> fas fa-' +
                entry.id +
                "\
                  </div>";
              break;
            default:
              regular.value +=
                '<div class="col-xl-3 col-lg-4 col-sm-6">\
                            <i class="far fa-' +
                entry.id +
                '"></i> far fa-' +
                entry.id +
                "\
                        </div>";
          }
        }
      }
    }

    document.getElementById("solid").innerHTML = solid.value;
    document.getElementById("brand").innerHTML = brand.value;
    document.getElementById("regular").innerHTML = regular.value;
  });
</script>

<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Solid</h4>
          </div>
          <div class="card-body">
            <p class="card-title-desc">
              Use <code>&lt;i class="fas fa-ad"&gt;&lt;/i&gt;</code>
              <span class="badge bg-success">v 5.13.0</span>.
            </p>
            <div class="row icon-demo-content" id="solid"></div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Regular</h4>
          </div>
          <div class="card-body">
            <p class="card-title-desc">
              Use <code>&lt;i class="far fa-address-book"&gt;&lt;/i&gt;</code>
              <span class="badge bg-success">v 5.13.0</span>.
            </p>
            <div class="row icon-demo-content" id="regular"></div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Brands</h4>
          </div>
          <div class="card-body">
            <p class="card-title-desc">
              Use <code>&lt;i class="fab fa-500px"&gt;&lt;/i&gt;</code>
              <span class="badge bg-success">v 5.13.0</span>.
            </p>
            <div class="row icon-demo-content" id="brand"></div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
</template>
