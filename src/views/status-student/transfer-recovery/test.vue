<template>
  <h3>Draggable 1</h3>
  <div class="row">
    <div class="col-3">
      <div class="list-group" v-for="(item, ind) in list" :key="ind">
        <div class="list-group-item">{{ item[0]?.name }}</div>
      </div>
    </div>
    <div class="col-3">
      <div v-for="(item, ind) in list1" :key="ind">
        <draggable :move="checkMove" class="list-group" :removeCloneOnHide="false" :list="item" willInsertAfter="false"
          :group="{ name: 'people' }" ghost-class="ghost" :sort="false">
          <template #item="{ element, index }">
            <div class="list-group-item"><b class="handle">{{ element?.id }}</b>
              <p>{{ element?.name }}</p>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div class="col-3" style="text-transform: uppercase;">
      <div v-for="(item, ind) in list2" :key="ind">
        <draggable :move="checkMove" class="list-group" :list="item" willInsertAfter="false" group="people" :sort="false"
          itemKey="item.name">
          <template #item="{ element, index }">
            <div class="list-group-item"><b class="handle">{{ element?.id }}</b>
              <p>{{ element?.name }}</p>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
// import nestedDraggable from "./components/nested.vue";
import draggable from "vuedraggable";


function log1(e) {
  console.log(e, 'aa');
}
function log2(e) {
  console.log(e, 'aa');
}
function checkMove(evt) {
  let element = evt.to;
  let val = element.getElementsByClassName('list-group-item')
  if (val.length) {
    return false
  }
  return true;
}




const list = ref([
  [{ name: "John", id: 1 }],
  [{ name: "Joao", id: 2 }],
  [{ name: "Jean", id: 3 }],
  [{ name: "Gerard", id: 4 }],
  [],
  [],
  [],
  [],
  []
])
const list1 = ref([
  [{ name: "John", id: 1 }],
  [{ name: "Joao", id: 2 }],
  [{ name: "Jean", id: 3 }],
  [{ name: "Gerard", id: 4 }],
  [],
  [],
  [],
  [],
  []
])

const list2 = ref([
  [{ name: "Juan", id: 5 }],
  [{ name: "Edgard", id: 6 }],
  [{ name: "Johnson", id: 7 }],
  [],
  [],
  [],
  [],
  []
])

</script>
<style lang="scss">
.box {
  padding: 5px;
  border: 1px solid #ccc;
}

.draggableBlock {
  min-height: 350px;
  border: 1px solid red;

}

.list-group {
  height: 50px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background-color: #fff;
  padding: 5px 10px;
  margin-bottom: 12px;
  border: 1px solid #eff0f2;

  .list-group-item {
    background: none;
    padding: 0 !important;
    border: 0 !important;

    p {
      margin-bottom: 0;
    }
  }
}
</style>