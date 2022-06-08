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
                               :enable-native-drag="true"
                               h="auto" :w="400" :max-width="400" :max-height="800">
        <nav class="panel">
          <div class="panel-heading">
            <div class="columns">
              <div class="column is-narrow">
                <i class="fa fa-arrows" style="margin-right: 10px"></i>
                {{ $t("editorTitle") }}
              </div>
              <div class="column is-1 is-offset-7">
                <div @click="minimizeEditor" style="cursor:pointer"> {{editorMinimized ? '➕' : '➖'}} </div>
              </div>
            </div>
          </div>

          <p class="panel-tabs">
            <a :class="{ 'is-active': activeTab === 'general' }" @click="openTab('general')">{{ $t("menu.general") }}</a>
            <a :class="{ 'is-active': activeTab === 'bubbles' }" @click="openTab('bubbles')">{{ $t("menu.bubbles") }}</a>
            <a :class="{ 'is-active': activeTab === 'logo' }" @click="openTab('logo')">{{ $t("menu.logo") }}</a>
            <a :class="{ 'is-active': activeTab === 'imp-exp' }" @click="openTab('imp-exp')">{{ $t("menu.importExport") }}</a>
          </p>
<!--          <v-select
              :options="languages"
              v-model="selectedLanguage"
              @input="switchLocale"
          >
            <template #option="option">
              <div >
                        <span
                            class="fi"
                            :class="`fi-${langToCountry(option.label)}`"
                        ></span>
                {{ option.label }}
              </div>

            </template>
          </v-select>-->
        </nav>

        <div class="editor-content" :style="{'display': editorMinimized ? 'none': null}">

            <div v-if="activeTab === 'general'" data-name="general-tab">
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="param.showBubbles">
                    {{ $t("showBubbles") }}
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="controle">
                  <label class="checkbox">
                    <input type="checkbox" v-model="param.playAnimation">
                    {{ $t("bubbleAnim") }}
                  </label>
                </div>
              </div>
              <div class="field">
                <label class="label">{{ $t("progColor") }}</label>
                <div class="controle">
                  <input class="u-full-width" type="color" placeholder="#2d" v-model="param.progressColor"
                         id="progresscolorInput" style="width: 100%">
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'bubbles'" data-name="bubbles-tab">
              <div class="field">
                <div class="control">
                  <label for="exampleRecipientInput">{{ $t("langCode") }}</label>
<!--                  <div class="counter" style="background-color: red;display: inline-block;font-size: 10px;border-radius: 10px;color: white;">
                    <span>1</span>
                  </div>-->
                  <v-select :options="availbleLangs" v-model="selected_lang"
                            @input="languageChanged"
                            :reduce="option=> option.label"
                            :clearable="false" id="exampleRecipientInput">
                    <template #option="option" >
                      <div class="columns">
                        <div class="column is-4">
                          <span class="fi" :class="`fi-${langToCountry(option.label)}`"></span>
                          {{option.label}}
                        </div>
                        <div class="column is-4 is-offset-4" style="text-align: right">
                          <span class="tag is-warning" v-if="option.bubbleCount > 0 && option.bubbleCount < 3" style="font-size: 9px">{{ $t("notEnoughBubbles") }}</span>
                          <span class="tag is-success" style="font-size: 9px" v-else-if="option.bubbleCount >= 3">{{ $t("valide") }}</span>
                          <span class="tag is-light" style="font-size: 9px" v-else>{{ $t("empty") }}</span>
                        </div>
                      </div>
                    </template>
                    <template #selected-option="option">
                      <span class="fi" :class="`fi-${langToCountry(option.label)}`"></span>
                      <span style="margin-left: 0.5em">{{option.label}}</span>
                    </template>
                  </v-select>
                </div>
              </div>


              <draggable tag="div" :list="bubbles" class="bubbles-editor-section"  handle=".bubble-drag-handle">
                <bubbleEdit style="margin: 10px;" v-for="(bubble,i) in bubbles" @onDeleteBubble="deleteBubble(i)" :key="i" :index="i" :bubble="bubble"/>
              </draggable>

              <div style="text-align: center; margin-top: 10px">
                <div class="alert-warning" v-if="bubbles.length < 3" style="font-size: 9px; margin-bottom: 10px">
                  {{ $t("warning") }} ({{3 - bubbles.length}}) <u style="cursor: pointer" @click="createNeededBubbles">{{ $t("createBubble") }}</u>
                </div>
                <button  class="button" @click="addBubble" v-if="bubbles.length < 5">{{ $t("addBubble") }}
                  <i class="fa fa-plus-circle" style="margin-left: 5px"></i>
                </button>

              </div>
            </div>

          <div v-if="activeTab === 'logo'">
            <div class="notification is-danger" v-if="showLoadImgError">
              <button class="delete" @click="showLoadImgError = false"></button>
              {{ $t("imgUploadWarn") }}
              <strong> {{ $t("logoSrc") }}</strong> {{ $t("imgUploadWarn2") }}
              <i>({{ $t("currentValueImg") }} : "{{ param.logo.src }}")</i> .
              <br />
              {{ $t("nb") }}
            </div>

              <div class="file is-centered has-name is-boxed">
                <label class="file-label">
                  <input class="file-input" name="logo-img" type="file" accept=".gif,.png,.jpeg,.jpg" @change="onFileChange">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      {{ $t("chooseImg") }}
                    </span>
                  </span>
                  <span class="file-name" v-if="logoFileName">
                    {{ logoFileName }}
                  </span>
                </label>
              </div>
              <style-editor style="padding: 2em 3em 0 3em;" v-if="param.logo.src" :element="param.logo" :isImage="true"></style-editor>

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
                <button class="button is-primary" @click="simulateLoading">{{ $t("replayAnim") }} <i class="fa fa-arrows-rotate" style="margin-left: 5px"></i></button>
              </div>
            </div>

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
          <div style="display: flex;" :style="{'height': '50%', ...param.logo.style}">
            <img v-if="param.logo.src" :src="param.logo.src" style="object-fit: contain" alt="clientLogo" @load="logoLoaded" @error="errorLoadingImage">
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
import draggable from 'vuedraggable'
import styleEditor from '@/components/StyleEditor'
import 'flag-icons/css/flag-icons.min.css'
export default {
  name: "LoaderView",
  data:function(){
    return {
      activeTab: 'general',
      languages: ["fr", "en"],
      selectedLanguage:'fr',
      progress: 0,
      selected_lang: 'fr',
      logoFileName: null,
      Dfds: [],
      isLoaded: false,
      bubbleProgress: 0,
      startingProgress: 0,
      editorMinimized: false,
      param: {
        progressColor: '#2299DD',
        playAnimation: true,
        showBubbles: true,
        bubbles: {
          "fr": []
        },
        logo: {
          src: null,
          style: {}
        }
      },
      isEditorActive: true,
      showLoadImgError: false,
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
    importParam,
    draggable,
    styleEditor
  },
  computed:{
    bubbles(){
      return this.param.bubbles[this.selected_lang]
    },
    availbleLangs(){
      const langs = ['fr',  'en', 'de', 'es', 'cz', 'pl']
      let result = []
      langs.forEach(lang=>{
        result.push({label: lang, bubbleCount: this.bubbleCount(lang)})
      })
      return result.sort((a,b)=> b.bubbleCount - a.bubbleCount)
    }
  },
  methods:{
    switchLocale() {
      console.log(this.selectedLanguage)
      if (this.$i18n.locale !== this.selectedLanguage) {
        this.$i18n.locale = this.selectedLanguage;
      }
    },
    bubbleCount(lang){
      if(!this.param.bubbles[lang])
        return 0;
      else
        return this.param.bubbles[lang].length
    },
    openTab(code){
      this.activeTab = code
      // always activate editor
      this.isEditorActive = true
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if(!file)
        return;
      let reader = new FileReader();
      reader.onloadend = () => {
        this.logoFileName = file.name;
        this.param.logo.src = reader.result;
        this.param.logo.name = file.name;
      }
      reader.readAsDataURL(file);
    },
    errorLoadingImage(){
      this.showLoadImgError = true;
      this.activeTab = 'logo';
      this.isEditorActive = true;
    },
    logoLoaded(){
      this.showLoadImgError = false;
    },
    importedParam(param){
      // if no language (no bubbles) set default one
      if(!Object.keys(param.bubbles).length){
        param.bubbles.fr = []
      }
      if(param.logo && param.logo.src)
        this.logoFileName = null
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
    langToCountry(lang){
      lang=lang.toLowerCase();
      switch(lang){
        case "en":
         return "gb"
        default:
          return lang
      }
    },
    addBubble(){
      this.bubbles.push({
        content:[],
        style:{},
        opacity: 100
      })
    },
    createNeededBubbles(){
      console.log("(3 - this.bubbles.length)", (3 - this.bubbles.length))
      let to_create_nbr = (3 - this.bubbles.length)
      for(let i=0; i< to_create_nbr; i++){
        this.addBubble();
      }
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
    languageChanged(){
      // if the lang dosn't exist then create it
      if(this.selected_lang && !this.param.bubbles[this.selected_lang])
        this.createLang(this.selected_lang)
      this.simulateLoading()
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
.alert-warning{
  background-color: #ff8c00;
  border: 1px solid #e95b1e;
  color: white;
  padding: 0.5em;
}
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
