<template>
  <div>
    <template v-if="!noSize">
      <div class="columns">
        <div class="column is-5">
          <label>Size:</label>
          <input type="range" v-model.number="element.size" min="0" max="300" name="size">
        </div>
      </div>


    </template>
    <div class="columns">
      <div class="column">
        <label>X:</label>
        <input type="range" @input="rangeChanged" min="-100" max="100" name="marginX">
      </div>
      <div class="column">
        <label>Y:</label>
        <input type="range" @input="rangeChanged" min="-100" max="100" name="marginY">
      </div>
    </div>

    <div class="field has-addons" style="justify-content: center">
      <p class="control">
        <button class="button" :class="{'is-active active': isActiveStyle('font-weight')}"  @click="toggleStyle('font-weight','bold')">
          <span class="icon is-small">
            <i class="fas fa-bold"></i>
          </span>
        </button>
      </p>

      <p class="control">
        <button class="button" :class="{'is-active active': isActiveStyle('font-style')}" @click="toggleStyle('font-style', 'italic')">
            <span class="icon is-small">
              <i class="fas fa-italic"></i>
            </span>
        </button>
      </p>
      <p class="control">
        <button class="button"
                :class="{'is-active active': isActiveStyle('text-decoration')}"
                @click="toggleStyle('text-decoration', 'underline')">
          <span class="icon is-small">
            <i class="fas fa-underline"></i>
          </span>
        </button>
      </p>
      <p class="control">
        <input class="input color-input" type="color" v-model="element.style.color">
      </p>
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
  background-color: #dedede !important;
}
.color-input{
  width: 50px;
  cursor: pointer;
}
</style>
