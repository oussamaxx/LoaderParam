<template>
  <div>
    <template v-if="!noSize">
      <label>Size:</label>
      <input type="range" v-model.number="element.size" min="0" max="300" name="size">
    </template>
    <div class="row">
      <div class="six columns">
        <label>X:</label>
        <input type="range" @input="rangeChanged" min="-100" max="100" name="marginX">
      </div>
      <div class="six columns">
        <label>Y:</label>
        <input type="range" @input="rangeChanged" min="-100" max="100" name="marginY">
      </div>
    </div>
    <div class="multi-button" >
      <button style="font-weight: 900; font-size: 14px" :class="{'active': isActiveStyle('font-weight')}"
              @click="toggleStyle('font-weight','bold')">B</button>
      <button style="font-size: 14px"
              :class="{'active': isActiveStyle('font-style')}"
              @click="toggleStyle('font-style', 'italic')"><i>i</i></button>
      <button style="text-decoration: underline;font-size: 14px"
              :class="{'active': isActiveStyle('text-decoration')}"
              @click="toggleStyle('text-decoration', 'underline')">U</button>
      <input type="color" v-model="element.style.color">
    </div>




  </div>
</template>

<script>
export default {
  name: "StyleEditor",
  props: {
    element:{
      type: Object
    },
    noSize:{
      type: Boolean,
      default: false,
    }
  },
  data: function(){
    return {
    }
  },
  computed:{

  },
  methods:{
    isActiveStyle(style){
      if(!this.element.style)
        return false;
      return Object.prototype.hasOwnProperty.call(this.element.style, style);
    },
    rangeChanged($event){
      switch ($event.target.name) {
        case "marginX":
          this.$set(this.element.style, 'position', 'relative')
          this.$set(this.element.style, 'right', $event.target.value + 'px')
          break;
        case "marginY":
          this.$set(this.element.style, 'position', 'relative')
          this.$set(this.element.style, 'top', $event.target.value + 'px')
          break;
      }
    },
    toggleStyle(key, value){
      if(!this.isActiveStyle(key)) {
        this.$set(this.element.style, key, value)
      } else {
        this.$delete(this.element.style, key);
      }
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
button.active {
  background-color: #adadad !important;
}
.multi-button {
  background-color: #eee;
  padding: 5px;
  border-radius: 12px;
}
.multi-button button {
  height: 40px;
  width: 50px;
  border: none;
  background-color: inherit;
}
.multi-button button:hover {
  background-color: #ddd;
}
.multi-button button:first-child {
  border-radius: 8px 0 0 8px;
}
.multi-button button:last-child {
  border-radius: 0 8px 8px 0;
}
</style>
