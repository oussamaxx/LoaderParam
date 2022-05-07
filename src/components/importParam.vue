<template>
  <modal name="import-dialog" height="auto" :draggable="true" >
    <div style="padding: 1em;max-height: 85vh; overflow: auto;" >
      <div class="columns">
        <div class="column">
          <div class="control">
            <textarea class="textarea json-text" rows="8" v-model="jsonString" placeholder="{format: JSON}"></textarea>
          </div>

        </div>
      </div>
      <json-viewer
          :value="parsedJson"
          copyable
          boxed
          sort></json-viewer>
      <div class="columns" style="margin-top: 10px">
        <div class="column is-5">
          <button class="button is-primary" type="submit" @click="importParam" :disabled="jsonString === ''">Import 📤</button>
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
const kindOf = require('kind-of')


import { required, numeric, helpers, alphaNum } from 'vuelidate/lib/validators'
const isObject = (value) => kindOf(value) === 'object'
const isArray = (value) => kindOf(value) === 'array'
const isBoolean = (value) => (!helpers.req(value) || kindOf(value) === 'boolean')
const isHexColor = helpers.regex('isHexColor', /^#[0-9a-f]{3,6}$/i)
import JsonViewer from 'vue-json-viewer'
export default {
  name: "importParam",
  data: function(){
    return {
      jsonString: "{\n" +
          "    \"showBubbles\": true,\n" +
          "    \"progressColor\": \"#FF0000\",\n" +
          "    \"playAnimation\": true,\n" +
          "    \"bubbles\": {\n" +
          "        \"fr\": [{\n" +
          "            \"content\": [{\n" +
          "                \"label\": \"2800\",\n" +
          "                \"style\": {\n" +
          "                    \"font-weight\": \"bold\"\n" +
          "                }\n" +
          "            }, {\n" +
          "                \"label\": \"Collaborateurs\"\n" +
          "            }]\n" +
          "        }, {\n" +
          "            \"style\": {\n" +
          "                \"margin-bottom\": \"10%\"\n" +
          "            },\n" +
          "            \"content\": [{\n" +
          "                \"label\": \"Dans + de\"\n" +
          "            }, {\n" +
          "                \"label\": \"7 pays\",\n" +
          "                \"style\": {\n" +
          "                    \"font-weight\": \"bold\"\n" +
          "                }\n" +
          "            }]\n" +
          "        }, {\n" +
          "            \"style\": {\n" +
          "                \"margin-top\": \"5%\"\n" +
          "            },\n" +
          "            \"size\": \"200\",\n" +
          "            \"content\": [{\n" +
          "                \"label\": \"200M€\",\n" +
          "                \"style\": {\n" +
          "                    \"font-weight\": \"bold\"\n" +
          "                }\n" +
          "            }, {\n" +
          "                \"label\": \"chiffres d'affaires en 2020\"\n" +
          "            }]\n" +
          "        }, {\n" +
          "            \"style\": {\n" +
          "                \"margin-bottom\": \"7%\"\n" +
          "            },\n" +
          "            \"content\": [{\n" +
          "                \"label\": \"Fondée en\"\n" +
          "            }, {\n" +
          "                \"label\": \"1984\",\n" +
          "                \"style\": {\n" +
          "                    \"font-weight\": \"bold\"\n" +
          "                }\n" +
          "            }]\n" +
          "        }, {\n" +
          "            \"content\": [{\n" +
          "                \"label\": \"Top #10\",\n" +
          "                \"style\": {\n" +
          "                    \"font-weight\": \"bold\"\n" +
          "                }\n" +
          "            }, {\n" +
          "                \"label\": \"Greate Places To Work\"\n" +
          "            }]\n" +
          "        }],\n" +
          "        \"en\": [{\n" +
          "            \"size\": \"200\",\n" +
          "            \"content\": [{\n" +
          "                \"label\": \"Somthing in english\"\n" +
          "            }, {\n" +
          "                \"label\": \"8M£\",\n" +
          "                \"style\": {\n" +
          "                    \"font-weight\": \"bold\"\n" +
          "                }\n" +
          "            }]\n" +
          "        }, {\n" +
          "            \"content\": [{\n" +
          "                \"label\": \"Test\"\n" +
          "            }, {\n" +
          "                \"label\": \"Somthing else in english\",\n" +
          "                \"style\": {\n" +
          "                    \"font-weight\": \"bold\"\n" +
          "                }\n" +
          "            }]\n" +
          "        }, {\n" +
          "            \"size\": \"200\",\n" +
          "            \"content\": [{\n" +
          "                \"label\": \"Test\"\n" +
          "            }, {\n" +
          "                \"label\": \"Somthing else in english!\",\n" +
          "                \"style\": {\n" +
          "                    \"font-weight\": \"bold\"\n" +
          "                }\n" +
          "            }]\n" +
          "        }]\n" +
          "    },\n" +
          "    \"logo\": {\n" +
          "        \"src\": \"../img/srh.gif\",\n" +
          "        \"style\": {}\n" +
          "    }\n" +
          "} ",
      param: "",
      error: null,
    }
  },
  validations() {
    return {
      param: {
        isObject,
        required,
        showBubbles: {
          isBoolean
        },
        playAnimation: {
          isBoolean,
        },
        progressColor: {
          isHexColor,
        },
        logo: {
          isObject,
          source:{
            alphaNum,
          }
        },
        bubbles:{
          // languages
          $each: {
            // bubbles
            $each: {
              size: {
                numeric
              },
              style:{
                required,
                isObject
              },
              content: {
                required,
                isArray,
                // labels
                $each:{
                  style:{
                    required,
                    isObject
                  },
                }
              }
            }
          }
        }
      }
    }

  },
  components:{
    JsonViewer
  },
  computed: {
    parsedJson(){
      try {
        return JSON.parse(this.jsonString)
      } catch(e){
        return "JSON YOU ENTERED IS NOT CORRECT!"
      }
    }
  },
  methods:{
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

      // everthing is good  emit the correct param
      this.$emit('imported-param', this.param)


    },
    checkIfError(){

      return false;
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
