<template>
  <div class="collapsible-group">
    <div ref="collapsible" class="collapsible">Bubble {{ index }}</div>
    <div class="content" ref="content">
      <div style="margin-top:10px">
        <label>Style</label>
        <styleEditor :element="bubble"/>
      </div>
      <hr>
      <div>
        <label>Content</label>
        <div v-for="(line, i) in bubble.content" :key="i">
          <label :for="'label'+i">Label {{i+1}} :</label>
          <input class="u-full-width" type="text" placeholder="Text..." v-model="line.label" :id="'label'+i">
          <styleEditor :element="line" :noSize="true"/>
        </div>
        <button @click="addLabel" v-if="bubble.content.length < 3">Add Label +</button>
      </div>
    </div>
  </div>
</template>

<script>
import styleEditor from '@/components/StyleEditor'
export default {
  name: "bubbleEdit",
  props:['index', 'bubble'],
  components:{
    styleEditor
  },
  methods: {
    addLabel(){
      // add label
      this.bubble.content.push({label:'', style: {}})
      setTimeout(()=>{
        // set collapsable content height
        this.$refs.content.style.maxHeight = this.$refs.content.scrollHeight + "px";
      }, 100)

    },
    initCollapsible: function(){
      let coll = this.$refs.collapsible;
      coll.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  },
  mounted(){
    this.initCollapsible()
  }
}
</script>

<style scoped>
hr{
  margin-top:1rem;
  margin-bottom:1rem
}
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
