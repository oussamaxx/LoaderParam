<template>
  <div class="collapsible-group" id="coll">
    <div ref="collapsible" class="collapsible">
      Bubble {{ index }}
      <span @click="deleteBubble" style="padding: 0;
    margin-left: 212px;">🗑️</span>
    </div>
    <div class="collaps-content" :id="'coll-content-'+index" ref="content">
      <div style="margin-top:10px">
        <label>Style</label>
        <styleEditor :element="bubble"/>
      </div>
      <hr>
      <div>
        <h6 class="title is-6">Content</h6>

        <ul class="list-group">
            <li   v-for="(line, i) in bubble.content" :key="i" class="list-group-item">
              <i class="fa fa-align-justify label-handle"></i>
              <input class="input is-small label-input" type="text" placeholder="Text..." v-model="line.label" :id="'label'+i">
              <div class="actions">
                <popper
                    trigger="clickToOpen"
                    :boundaries-selector="'#coll-content-'+index"
                    >
                  <div class="popper">
                    <styleEditor :element="line" :noSize="true"/>
                  </div>

                  <i class="fa fa-paint-brush" slot="reference"></i>
                </popper>

                <i class="fa fa-trash-can delete-label" @click="deleteLabel(i)"></i>
              </div>
            </li>
            <li class="list-group-item" style="padding:0; margin-bottom: 1em">
              <button class="button is-fullwidth add-label" @click="addLabel" v-if="bubble.content.length < 3">
                <span style="text-decoration: underline">
                  Add Label
                </span>
                <span class="icon is-medium" style="margin-left: 5px;">
                  <i class="fa fa-circle-plus"></i>
                </span>
              </button>
            </li>


        </ul>




      </div>
    </div>
  </div>
</template>

<script>
import styleEditor from '@/components/StyleEditor'
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
export default {
  name: "bubbleEdit",
  props:['index', 'bubble'],
  components:{
    styleEditor,
    Popper
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

.collapsible-group>.collaps-content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
}
.list-group {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}
.list-group-item:first-child {
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
}
.list-group-item {
  margin-top: 0;
  position: relative;
  display: block;
  padding: .75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
}
.list-group-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: .25rem;
  border-bottom-left-radius: .25rem;
}
.delete-label {
  cursor: pointer;
}
.actions {
  padding-top: 6px;
  float: right;
}
.actions i {
  margin-left: 10px;
}
.label-input {
  width: auto;
  margin-left: 1em;
}
.content ul {
  margin-left: 0;
}
.add-label {
  border: none;
  color: cornflowerblue;
  font-weight: 600;
  padding: 0;
}
</style>
