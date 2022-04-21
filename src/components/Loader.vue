<template>
  <transition name="fade">
    <div id="content_loading" style="position:absolute;z-index:9999;width:100%;height:100%;background:#f2f6f9;">
      <import-param @imported-param="importedParam"/>
      <vue-draggable-resizable class="popup-pannel" :drag-handle="'.header'" :parent="true"
                               :style="{'overflow': editorMinimized ? 'hidden': null}"
                               :active="true"
                               class-name-active="active-pannel"
                               @activated="onEditorActivated"
                               @deactivated="onEditorDeactivated"
                               :h="panelHight" :w="400" :max-width="400" :max-height="800" @resizing="onResize">
        <div class="header" style="max-height: 20px;">
          <div class="row">
            <div class="eleven columns">
              Editor (drag)
            </div>
            <div class="one column">
              <div @click="minimizeEditor" style="cursor:pointer"> {{editorMinimized ? '➕' : '➖'}} </div>
            </div>

          </div>

        </div>

        <div class="content" ref="editorContent">
          <template v-if="singleEditMode && selectedBubble">
            <div style="overflow: auto; max-height:240px;">
              <bubbleEdit :index="0" :bubble="selectedBubble"/>
            </div>
          </template>
          <template v-else>
            <label>
              <input type="checkbox" v-model="showBubbles">
              <span class="label-body">Show Bubbles</span>
            </label>
            <label>
              <input type="checkbox" v-model="playAnimation">
              <span class="label-body">Bubble Animation</span>
            </label>
            <div>
              <label for="progresscolorInput">Progress Color</label>
              <input class="u-full-width" type="color" placeholder="#2d" v-model="progressColor" id="progresscolorInput">
            </div>

            <hr>
            <label><strong>Bubbles:</strong></label>

            <label for="exampleRecipientInput">Lang Code</label>
            <v-select :options="availbleLangs" v-model="selected_lang" taggable
                      @option:created="createLang"
                      :clearable="false" id="exampleRecipientInput"/>
            <div style="overflow: auto; max-height:240px;">
              <bubbleEdit style="margin: 10px;" v-for="(bubble,i) in bubbles" @onDeleteBubble="deleteBubble(i)" :key="i" :index="i" :bubble="bubble"/>
            </div>

            <div style="text-align: center; margin-top: 10px">
              <button @click="addBubble" v-if="bubbles.length < 5">Add Bubble +</button>
            </div>


            <hr>

            <div style="text-align: center">
              <div class="row">
                <button class="button-primary" @click="simulateLoading">Replay Animation 🔄</button>
              </div>
              <div class="row">
                <div class="six columns">
                  <button class="button-primary" >Export Params 📥</button>
                </div>
                <div class="six columns">
                  <button class="button-primary" @click="openImportModal" >Import Params 📤</button>
                </div>
              </div>
            </div>
          </template>

        </div>
      </vue-draggable-resizable>





      <vue-topprogress ref="topProgress" :color="progressColor" :height="5"></vue-topprogress>
      <div :class="{'slideup': showBubbles}" style="width:100%;height:25%;display: flex;align-items: center;justify-content: center; transform: translateY(30vh)">
        <span  class="loading-progress">{{ progress }}%</span>
      </div>
      <div class="bull-container" :class="{'popup-animate': showBubbles}">
        <template v-if="showBubbles">
          <LoginBubble v-for="(bubble,b_i) in bubbles" @click.native="onSelectBubble(bubble, b_i)" :class="{'bubble': playAnimation}" :opacity-percentage="bubble.opacity" :size="bubble.size" :style="bubble.style"  :key="b_i">
            <template v-for="(line,i) in bubble.content">
              <span   :key="i" :style="{'font-size': computeBullFontSize(bubble.size), ...line.style}">{{ line.label }}</span>
            </template>
          </LoginBubble>
        </template>
      </div>

      <div style="width:100%;height:20%;display: flex">
        <div style="flex-grow: 1; flex: 1;"><!-- Empty div--></div>
        <div style="flex-grow: 1;flex: 1;display: flex;justify-content: center;align-items: center">
          <div style="display: flex;" :style="{'height': '50%', ...clientIconContainerCss}">
            <img v-if="clientLogoSrc" :src="clientLogoSrc" style="object-fit: contain" alt="clientLogo">
          </div>
        </div>
        <div style="flex-grow: 1;flex: 1;display: flex;justify-content: flex-end;align-items: center;">
        <!--  Empty div  -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { vueTopprogress } from 'vue-top-progress'
import LoginBubble from '@/components/LoginBubble'
import bubbleEdit from '@/components/bubbleEdit'
import importParam from '@/components/importParam'
import VueDraggableResizable from 'vue-draggable-resizable'
import $ from "jquery";
import ImportParam from "@/components/importParam";
export default {
  name: "LoaderView",
  data:function(){
    return {
      progress: 0,
      panelHight: 'auto',
      selected_lang: 'fr',
      clientLogoSrc: null,
      Dfds: [],
      isLoaded: false,
      showBubbles: false,
      bubbleProgress: 0,
      startingProgress: 0,
      clientIconContainerCss: null,
      playAnimation: true,
      progressColor: '#2299DD',
      editorMinimized: false,
      singleEditMode: false,
      param: {
        bubbles: {
          "fr": []
        }
      },
      selectedBubble: null,
    }
  },
  components:{
    ImportParam,
    // eslint-disable-next-line vue/no-unused-components
    vueTopprogress,
    LoginBubble,
    bubbleEdit,
    VueDraggableResizable,
    importParam
  },
  computed:{
    bubbles(){
      return this.param.bubbles[this.selected_lang]
    },
    availbleLangs(){
      return Object.keys(this.param.bubbles)
    }
  },
  methods:{
    importedParam(param){
      // if no language (no bubbles) set default one
      if(!Object.keys(param.bubbles).length){
        param.bubbles.fr = []
      }
      // select the first language that comes in bubbles
      this.selected_lang = Object.keys(param.bubbles)[0]
      this.param = param
      this.$modal.hide('import-dialog')
      this.simulateLoading()
    },
    openImportModal(){
      this.$modal.show('import-dialog')
    },
    onSelectBubble(bubble){
      this.selectedBubble = bubble;
      this.singleEditMode = true;
    },
    deleteBubble(index){
      this.bubbles.splice(index, 1)
    },
    onResize(left, top, width, height) {
      //this.w = width
      this.panelHight = height
    },
    onEditorActivated(){
      if(this.editorMinimized)
        this.minimizeEditor();
    },
    onEditorDeactivated(){
      if(!this.editorMinimized)
        this.minimizeEditor()
    },
    minimizeEditor(){
      // set panel overflow to hidden and its height to the height of the header
      this.editorMinimized = !this.editorMinimized;
      this.panelHight = this.editorMinimized ? 50 : this.$refs.editorContent.scrollHeight + 50;

    },
    showProgress(value){
      this.progress = Math.floor(value)
      if(this.showBubbles)
        this.showBubble();
    },
    showBubble(){
      // get the index of the bubble to show
      const current_bubble_index = Math.floor((this.startingProgress - (100 - this.progress)) / this.bubbleProgress)
      if(current_bubble_index >= this.bubbles.length)
        return;
      // set current and all previous bubbles opacity to 100
      for(let i=0; i <= current_bubble_index + 1;i++){
        // if opacity isn't set already set it to 100
        if(this.bubbles[i] && !this.bubbles[i].opacity){
          this.bubbles[i].opacity = 100
        }

      }

    },
    createLang(lang){
      console.log("created lang:", lang)
      this.$set(this.param.bubbles, lang, [])
    },
    addBubble(){
      this.bubbles.push({
        content:[],
        style:{},
        opacity: 100
      })
      setTimeout(()=>{
        this.panelHight = this.$refs.editorContent.scrollHeight+ 50;
      }, 100)
    },
    loadBubbles() {
      this.startingProgress = (100 - this.progress);
      this.bubbleProgress = this.startingProgress / this.bubbles.length;
      this.showBubbles = true;
    },
    init(){
      if (sessionStorage.getItem("hideMenu") != "true"){
        $(".srhLoaderLogo").addClass("ready");
        this.$refs.topProgress.start()
        //this.$refs.topProgress.pause()
      }
    },
    increaseProgress(progress = 0){
      if(typeof progress === 'string')
        return;
      this.$refs.topProgress.increase(progress)
    },
    newStep(progress, dfd, msg){
      console.log("Loading Step Message:", msg)
      if (sessionStorage.getItem("hideMenu") == "true")
        return;
      this.Dfds.push(dfd);

      $.when(dfd).done(this.increaseProgress(progress));
    },
    loaded(){
      this.increaseProgress(10)
      $.when.apply($, this.Dfds).done(()=> {
        this.$refs.topProgress.done()
        this.isLoaded = true;
      });
    },
    computeBullFontSize(bullSize = 150){
      let ratio = bullSize * 0.004;
      return `calc(${ratio}vw + ${ratio}vh)`
    },
    simulateLoading(){
      // Use setTimeout for demo
      this.init()
      setTimeout(() => {
        this.loadBubbles();

      }, 1000)

      setTimeout(() => {
        this.newStep(20, new $.Deferred().resolve(), "test")

      }, 3000)
      setTimeout(() => {
        this.newStep(20, new $.Deferred().resolve(), "test")
      }, 5000)
      setTimeout(() => {
        this.loaded()
      }, 7000)
    },
  },
  mounted(){
    this.loadBubbles();
    // todo: change the color of the progress bar
    // watch the bar's progress and call showProgress
    this.$watch(() =>{if(this.$refs.topProgress){ return this.$refs.topProgress.progress}}, (value) => { this.showProgress(value) })

    this.simulateLoading()
  }
}
</script>

<style scoped>
hr{
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.popup-pannel {
  opacity: 0.2;
  transition: opacity 0.5s;
}
.active-pannel{
  opacity:1;
}
.bull-container{
  height:55%;margin-left: 20%; margin-right: 20%; display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
}
.clear {
  clear: both;
}
.slideup {
  animation: slideup 0.1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes slideup {
  to {
    transform: translateY(6vh);
  }
}

.popup-animate {
  animation: popup 0.1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes popup {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}


.bubble {
  --f: -0.5s;
  animation: heightChange 3s infinite ease-in-out alternate;
}
.bubble:nth-child(1) {
  animation-delay: calc(var(--f) * 0);
}
.bubble:nth-child(3) {
  animation-delay: calc(var(--f) * 1);
}
.bubble:nth-child(2) {
  animation-delay: calc(var(--f) * 2);
}
.bubble:nth-child(5) {
  animation-delay: calc(var(--f) * 3);
}
.bubble:nth-child(4) {
  animation-delay: calc(var(--f) * 4);
}
@keyframes heightChange {
  from {
    margin-top: 10px;
  }
  to {
    margin-top: 90px;
  }
}


</style>
