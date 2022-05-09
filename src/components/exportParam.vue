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
          <div class="alert-error" v-if="error">
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
  name: "importParam",
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
      this.param = unclean_param// its clean now :)
    },
    importParam(){
      this.error = null;
      // todo: change console logs with showable messages (toasts)
      try {
        this.param = JSON.parse(this.jsonString)
      } catch(e){
        this.error = "Param should have a JSON format"
        return;
      }

      //this.$forceUpdate()
      this.$v.param.$touch()

      console.log("this.$v", this.$v)
      if(this.$v.param.$invalid){
        console.log("INVALID")

        if(!this.$v.param.isObject){
          this.error = "Param should be an Object"
          return
        }else if(!this.$v.param.required){
          this.error = "Param should have attributes"
          return
        }
        if(!this.$v.param.showBubbles.isBoolean){
          this.error = "showBubbles should be a Boolean"
          return
        }
        if(!this.$v.param.playAnimation.isBoolean){
          this.error = "playAnimation should be a Boolean"
          return
        }
        if(!this.$v.param.progressColor.isHexColor){
          this.error = "progressColor should be a color in hex format #RRGGBB"
          return
        }

        // bubbles
        for (const lang in this.$v.param.bubbles.$each.$iter) {
          const lang_bubbles = this.$v.param.bubbles.$each.$iter[lang]
          // iterate over the lang bubbles

          for (const bubble_index in lang_bubbles.$each.$iter) {
            let bubble = lang_bubbles.$each.$iter[bubble_index]
            if(!bubble.size.numeric){
              this.error = `bubbles[${lang}][${bubble_index}].size should be numeric`
              return;
            }

            console.log('param is good cleaning')
            // cleaning is here
            // forEach language check style/content  if there is non add an empty object/array
            if(!bubble.style.required){
              this.$set(this.param.bubbles[lang][bubble_index], 'style', {})
            } else if(!bubble.style.isObject){
              this.error = `bubbles[${lang}][${bubble_index}].style should be an Object`
              return;
            }

            if(!bubble.content.required){
              this.$set(this.param.bubbles[lang][bubble_index], 'content', [])
            } else if(!bubble.content.isArray){
              this.error = `bubbles[${lang}][${bubble_index}].content should be an Array`
            } else {
              // verify labels
              for(const label_index in bubble.content.$each.$iter){
                let label_row = bubble.content.$each.$iter[label_index]
                if(!label_row.style.required){
                  this.$set(this.param.bubbles[lang][bubble_index].content[label_index], 'style', {})
                } else if(!label_row.style.isObject){
                  this.error = `bubbles[${lang}][${bubble_index}].content[${label_index}].style should be an Object`
                  return;
                }

              }
            }

          }
        }
      }
      console.log("PARAM", this.param)

      // everything is good  emit the correct param
      this.$emit('imported-param', this.param)


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
.json-text {
  font-family: Consolas, Menlo, Courier, monospace;
  font-size: 13px;
}
</style>
