<template>
  <transition name="fade">
    <div id="content_loading" style="position:absolute;z-index:9999;width:100%;height:100%;background:#f2f6f9;">
      <import-param @imported-param="importedParam"/>
      <export-param />
      <vue-draggable-resizable class="popup-pannel" :drag-handle="'.panel-heading'" :parent="true"
                               :active.sync="isEditorActive"
                               class-name-active="active-pannel"
                               @activated="onEditorActivated"
                               @deactivated="onEditorDeactivated"
                               :resizable="false"
                               h="auto" :w="400" :max-width="400" :max-height="800">
        <nav class="panel">
          <div class="panel-heading">
            <div class="columns">
              <div class="column is-narrow">
                <i class="fa fa-arrows" style="margin-right:10px"></i>
                Editor
              </div>
              <div class="column is-1 is-offset-7">
                <div @click="minimizeEditor" style="cursor:pointer"> {{editorMinimized ? '➕' : '➖'}} </div>
              </div>
            </div>
          </div>

          <p class="panel-tabs">
            <a :class="{'is-active': activeTab === 'general'}" @click="openTab('general')">General</a>
            <a :class="{'is-active': activeTab === 'bubbles'}" @click="openTab('bubbles')">Bubbles</a>
            <a :class="{'is-active': activeTab === 'logo'}" @click="openTab('logo')">Logo</a>
            <a :class="{'is-active': activeTab === 'imp-exp'}" @click="openTab('imp-exp')">Import/Export</a>
          </p>

        </nav>

        <div class="editor-content" :style="{'display': editorMinimized ? 'none': null}">
          <template v-if="singleEditMode && selectedBubble">
            <div style="overflow: auto; max-height:240px;">
              <bubbleEdit :index="0" :bubble="selectedBubble"/>
            </div>
          </template>
          <template v-else>

            <div v-if="activeTab === 'general'" data-name="general-tab">
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="param.showBubbles">
                    Show Bubbles
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="controle">
                  <label class="checkbox">
                    <input type="checkbox" v-model="param.playAnimation">
                    Bubble Animation
                  </label>
                </div>
              </div>
              <div class="field">
                <label class="label">Progress Color</label>
                <div class="controle">
                  <input class="u-full-width" type="color" placeholder="#2d" v-model="param.progressColor"
                         id="progresscolorInput" style="width: 100%">
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'bubbles'" data-name="bubbles-tab">
              <div class="field">
                <div class="control">
                  <label for="exampleRecipientInput">Language Code</label>
                  <v-select :options="availbleLangs" v-model="selected_lang" taggable
                            @option:created="createLang"
                            @input="simulateLoading"
                            :clearable="false" id="exampleRecipientInput"/>
                </div>
              </div>


              <div class="bubbles-editor-section">
                <bubbleEdit style="margin: 10px;" v-for="(bubble,i) in bubbles" @onDeleteBubble="deleteBubble(i)" :key="i" :index="i" :bubble="bubble"/>
              </div>

              <div style="text-align: center; margin-top: 10px">
                <button  class="button" @click="addBubble" v-if="bubbles.length < 5">Add Bubble
                  <i class="fa fa-plus-circle" style="margin-left: 5px"></i>
                </button>
              </div>
            </div>

            <div v-if="activeTab === 'logo'">

              <div class="file is-centered has-name is-boxed">
                <label class="file-label">
                  <input class="file-input" name="logo-img" type="file" @change="onFileChange">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose an image…
                    </span>
                  </span>
                  <span class="file-name">
                    {{ logoFileName }}
                  </span>
                </label>
              </div>

            </div>
            <div v-if="activeTab === 'imp-exp'">
              <div class="columns">
                <div class="column is-6">
                  <button class="button" @click="openExportModal" >Export Params 📥</button>
                </div>
                <div class="column is-6">
                  <button class="button" @click="openImportModal" >Import Params 📤</button>
                </div>
              </div>
            </div>



            <hr>

            <div style="text-align: center">
              <div class="row">
                <button class="button is-primary" @click="simulateLoading">Replay Animation <i class="fa fa-arrows-rotate" style="margin-left: 5px"></i></button>
              </div>
            </div>
          </template>

        </div>
      </vue-draggable-resizable>





      <vue-topprogress ref="topProgress" :color="param.progressColor" :height="5"></vue-topprogress>
      <div :class="{'slideup': param.showBubbles}" style="width:100%;height:25%;display: flex;align-items: center;justify-content: center; transform: translateY(30vh)">
        <span  class="loading-progress">{{ progress }}%</span>
      </div>
      <div class="bull-container" :class="{'popup-animate': param.showBubbles}">
        <template v-if="param.showBubbles">
          <!--@click.native="onSelectBubble(bubble, b_i)"-->
          <LoginBubble v-for="(bubble,b_i) in bubbles"  :class="{'bubble': param.playAnimation}" :opacity-percentage="bubble.opacity" :size="bubble.size" :style="bubble.style"  :key="b_i">
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
import exportParam from '@/components/exportParam'
import VueDraggableResizable from 'vue-draggable-resizable'
import $ from "jquery";
import ImportParam from "@/components/importParam";
export default {
  name: "LoaderView",
  data:function(){
    return {
      activeTab: 'general',
      progress: 0,
      selected_lang: 'fr',
      clientLogoSrc: null,
      logoFileName: '',
      Dfds: [],
      isLoaded: false,
      bubbleProgress: 0,
      startingProgress: 0,
      clientIconContainerCss: null,
      editorMinimized: false,
      singleEditMode: false,
      param: {
        progressColor: '#2299DD',
        playAnimation: true,
        showBubbles: true,
        bubbles: {
          "fr": []
        }
      },
      selectedBubble: null,
      isEditorActive: true,
    }
  },
  components:{
    ImportParam,
    exportParam,
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
    openTab(code){
      this.activeTab = code
      // always activate editor
      this.isEditorActive = true
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.logoFileName = file.name;
      this.clientLogoSrc = URL.createObjectURL(file);
    },
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
    openExportModal(){
      this.$modal.show('export-dialog', this.param)
    },
    onSelectBubble(bubble){
      this.selectedBubble = bubble;
      this.singleEditMode = true;
    },
    deleteBubble(index){
      this.bubbles.splice(index, 1)
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

    },
    showProgress(value){
      this.progress = Math.floor(value)
      if(this.param.showBubbles)
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
    },
    loadBubbles() {
      this.startingProgress = (100 - this.progress);
      this.bubbleProgress = this.startingProgress / this.bubbles.length;
      //this.showBubbles = true;
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
      console.log("simulateLoading")
      // remove opacity
      this.bubbles.forEach(bubble=>{
        delete bubble.opacity;
      })
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

.bubbles-editor-section {
  overflow: auto;
  max-height:420px;
}
.bubbles-editor-section::-webkit-scrollbar {
  width: 0.5em;
}


.bubbles-editor-section::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 10px;
  border: white 0px solid;
}
</style>
