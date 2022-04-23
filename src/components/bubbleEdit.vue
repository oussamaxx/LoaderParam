<template>
  <div class="collapsible-group">
    <div ref="collapsible" class="collapsible">
      Bubble {{ index }}
      <span @click="deleteBubble" style="padding: 0;
    margin-left: 212px;">🗑️</span>
    </div>
    <div class="content" ref="content">
      <div style="margin-top:10px">
        <label>Style</label>
        <styleEditor :element="bubble"/>
      </div>
      <hr>
      <div>
        <h6 class="title is-6">Content</h6>
        <div v-for="(line, i) in bubble.content" :key="i">
          <div class="columns">
            <div class="column is-9">
              <label :for="'label'+i">Label {{i+1}} :</label>
            </div>
            <div class="column is-3">
              <button @click="deleteLabel(i)">🗑️</button>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Text..." v-model="line.label" :id="'label'+i">
            </div>
          </div>

          <styleEditor :element="line" :noSize="true"/>

        </div>
        <button class="button is-fullwidth" @click="addLabel" v-if="bubble.content.length < 3">Add Label +</button>


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
    deleteLabel(index){
      this.bubble.content.splice(index,1)
    },
    deleteBubble(){
      this.$emit("onDeleteBubble", this.bubble)
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
