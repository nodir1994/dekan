
<template>
    <div pagetitle="`Akademik ma'lumotnoma`" class="diploma-list">
        <!-------START TABLE---------------------------------------->
        <div class="row table-division">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">
                       <span>Bu bo'limdan faqat marketing bo'limi foydalanadi!!!</span>
                    </div>
                </div>
            </div>
        </div>
        <!-------END TABLE---------------------------------------->
    </div>
</template>
  
<script>

import { allDate, allTables } from "../../data";

export default {
    setup() {

        // --------------form-------------------------
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };

        const handleBlur = () => {
            console.log("blur");
        };

        const handleFocus = () => {
            console.log("focus");
        };

        const filterOption = (input, option) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        return {
            allDate,
            allTables,
            //--------------------------
            filterOption,
            handleBlur,
            handleFocus,
            handleChange,
        };
    },
    components: {
        
    },
};
</script>
    
<style lang="scss">
.table-row-academic-reference-create {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 200px 140px 200px 150px;
}

.c-save {
    &:hover {
        color: #fff;
    }
}
</style>