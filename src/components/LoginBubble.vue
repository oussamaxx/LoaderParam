<!--
this component accept text as slot and recognize new lines in html due to <pre></pre>
& opacity as number
-->
<template>
    <div class="bubble-circle bubble-container"
         v-bind:style="{ opacity: opacityPercentage + '%', height: size + 'px', width: size + 'px'}">
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'LoginBubble',
  props: {
    // pass number without percentage character
    opacityPercentage: {
     type: [String, Number],
     default: 10
    },
    size: {
      type: [String, Number],
      default: 150
    }
  }
}
</script>
<style>
.bubble-circle {
  background: white;
  border-color: #f2f6f9;
  border-radius: 50%;
  border-style: solid;
  border-width: 6px;
  box-sizing: border-box;
  height: 150px;
  position: relative;
  width: 150px;
  transition: opacity 1s;
  box-shadow: 2px 20px 20px 6px rgb(0 0 0 / 8%);
  text-align: center;
}

.bubble-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
