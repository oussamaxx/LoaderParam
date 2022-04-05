<template>
  <div class="collapsible-group">
    <div class="collapsible">Open Section 2</div>
    <div class="content">
      <p>Lorem ipsum minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "bubbleEdit",
  data:function(){
    return {

    }
  },
  methods: {
    initCollapsible: function(){
      let coll = document.getElementsByClassName("collapsible");

      for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.maxHeight){
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      }
    }
  },
  mounted(){
    this.initCollapsible()
  }
}
</script>

<style scoped>
.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  padding: 0.5em
}

.active, .collapsible:hover {
  background-color: #555;
}

.collapsible:after {
  content: '\002B';
  color: white;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2212";
}

.collapsible-group>.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
}
</style>
