<template>
  <div class="style-container">
    <div style="text-align: right;" >
      <i class="fa fa-arrows-rotate reset" @click="reset"></i>
    </div>

    <template v-if="!noSize">
      <div class="columns fix-margin">
        <div class="column" style="padding-top: 0">
          <label>Size:</label>
          <vue-slider :min="50" :max="300"  v-model="element.size"></vue-slider>
        </div>
      </div>


    </template>
    <div class="columns fix-margin">
      <div class="column">
        <label>X:</label><!--
        <input type="range" min="-100" max="100" name="marginX">-->
        <vue-slider :min="-100" :max="100"  v-model="xpos" @change="xRangeChanged" name="marginX"/>
      </div>
      <div class="column" >
        <label>Y:</label>
        <vue-slider :min="-100" :max="100" v-model="ypos" @change="yRangeChanged" name="marginY"/>
      </div>
    </div>

    <div class="field has-addons" style="justify-content: center">
      <p class="control">
        <button class="button is-small" :class="{'is-active active': isActiveStyle('font-weight')}"  @click="toggleStyle('font-weight','bold')">
          <span class="icon is-small">
            <i class="fas fa-bold"></i>
          </span>
        </button>
      </p>

      <p class="control">
        <button class="button is-small" :class="{'is-active active': isActiveStyle('font-style')}" @click="toggleStyle('font-style', 'italic')">
            <span class="icon is-small">
              <i class="fas fa-italic"></i>
            </span>
        </button>
      </p>
      <p class="control">
        <button class="button is-small"
                :class="{'is-active active': isActiveStyle('text-decoration')}"
                @click="toggleStyle('text-decoration', 'underline')">
          <span class="icon is-small">
            <i class="fas fa-underline"></i>
          </span>
        </button>
      </p>
      <p class="control">
        <input class="input color-input is-small" type="color" v-model="element.style.color">
      </p>
    </div>


  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

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
      xpos: 0,
      ypos: 0,
    }
  },
  components:{
    VueSlider
  },
  methods:{
    isActiveStyle(style){
      if(!this.element.style)
        return false;
      return Object.prototype.hasOwnProperty.call(this.element.style, style);
    },
    xRangeChanged(value){
      this.$set(this.element.style, 'position', 'relative')
      this.$set(this.element.style, 'right', value + 'px')
    },
    yRangeChanged(value){
      this.$set(this.element.style, 'position', 'relative')
      this.$set(this.element.style, 'top', value + 'px')
    },
    toggleStyle(key, value){
      if(!this.isActiveStyle(key)) {
        this.$set(this.element.style, key, value)
      } else {
        this.$delete(this.element.style, key);
      }
    },
    reset(){
      this.element.style = {}
      this.xpos = 0;
      this.ypos = 0;
      this.$delete(this.element, 'size')
    }
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
.style-container .columns{
  margin-bottom: 0;
  font-size: 12px;
}
.reset {
  cursor: pointer;
  z-index: 1000;
  color: cornflowerblue;

}
.fix-margin{
  margin-top :0;
}
</style>
