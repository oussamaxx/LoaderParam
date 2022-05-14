<template>
  <modal name="export-dialog" height="auto" :draggable="true" @before-open="prepareParam" >
    <div style="padding: 1em;max-height: 85vh; overflow: auto;" >
      <div class="columns" v-if="raw">
        <div class="column">
          <div class="control">
            <textarea class="textarea json-text" rows="8" :value="stringifyJson" placeholder="{format: JSON}"></textarea>
          </div>

        </div>
      </div>
      <json-viewer v-else
          :value="param"
          copyable
          boxed
          sort></json-viewer>
      <div class="columns" style="margin-top: 10px">
        <div class="column is-2">
          <button class="button is-primary" type="submit" @click="closeModal">Okay 😊</button>
        </div>
        <div class="column is-3">
          <button class="button" type="submit" @click="raw = !raw" >{{ raw ? 'Beautify' : 'Raw'}}</button>
        </div>
        <div class="column is-7">
          <div class="alert-warning" v-if="error">
            ⚠️ {{error}}
          </div>
        </div>
      </div>

    </div>
  </modal>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  name: "exportParam",
  data: function(){
    return {
      param: {},
      error: null,
      raw: false,
    }
  },
  components:{
    JsonViewer
  },
  computed: {
    stringifyJson(){
      try {
        return JSON.stringify(this.param, null, 4)
      } catch(e){
        return "JSON YOU ENTERED IS NOT CORRECT!"
      }
    }
  },
  methods:{
    prepareParam(param){
      function isEmpty(obj) {
        return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
      }

      // CLEAN PARAM
      let unclean_param = JSON.parse(JSON.stringify(param.params));
      let langs = Object.keys(unclean_param.bubbles)
      langs.forEach(lang =>{
        let bubbles = unclean_param.bubbles[lang]
        // if there are no bubbles remove the language
        if(!bubbles.length){
          delete unclean_param.bubbles[lang]
          return;
        } else if(bubbles.length < 3){
          // if there are less then 3 bubbles then show a warning
          this.error = `warning: bubbles in lang [${lang}] are less than 3.`
        }

        bubbles.forEach(bubble=>{
          // remove style object if empty
          if(isEmpty(bubble.style)){
            delete bubble.style
          }
          // delete opacity
          delete bubble.opacity
          // loop on labels
          if(!bubble.content)
            return;
          bubble.content.forEach(label=>{
            if(isEmpty(label.style)){
              delete label.style
            }
          })
        })

      })
      // Clean Logo
      if(isEmpty(unclean_param.logo.style)){
        delete unclean_param.logo.style
      }
      // put file name instead of src
      if(unclean_param.logo.name){
        unclean_param.logo.src = unclean_param.logo.name
        delete unclean_param.logo.name
      }
      if(!unclean_param.logo.src)
        delete unclean_param.logo
      this.param = unclean_param// its clean now :)
    },
    closeModal(){
      this.$modal.hide('export-dialog')
    }
  }
}
</script>

<style scoped>
.alert-error{
  background-color: #ff0040;
  border: 1px solid #e91e63;
  color: white;
  padding: 0.5em;
}
.alert-warning{
  background-color: #ff8c00;
  border: 1px solid #e95b1e;
  color: white;
  padding: 0.5em;
}
.json-text {
  font-family: Consolas, Menlo, Courier, monospace;
  font-size: 13px;
}
</style>
