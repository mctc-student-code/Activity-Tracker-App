<template>
  <div id="app">
    
    <new-activity-record 
    v-on:record-added="newRecordAdded" 
    v-bind:types="types" 
    v-bind:media="media" 
   >
    </new-activity-record>
    <records-table v-bind:records="records" 
     v-on:delete-record="recordDeleted"></records-table>
    <activity-row></activity-row>
    <summary-message></summary-message>

  </div>
</template>

<script>
import NewActivityRecord from './components/NewActivityRecord.vue'
import RecordsTable from './components/RecordsTable.vue'
import ActivityRow from  './components/ActivityRow.vue'
import SummaryMessage from './components/SummaryMessage.vue'



export default {
  name: 'App',
  components: {
    NewActivityRecord,
    RecordsTable,
    SummaryMessage,
    ActivityRow
  },
  data(){
    return{
      records: [],
      activity: 'Dog Activities',
      types: ['Tour the City', 'Swim Together', 'Walk on the balcony', 'Go To the Park'],
      media: {Indoor:'Indoor Activities',  Outdoor: 'Outdoor Activities'}
    }
  },
    mounted(){
      this.updateRecord()
    },
    methods:{
      newRecordAdded(record){
        // tell your server to create a new record 
    console.log(record)
      this.$record_api.addRecord(record).then( record => {

        this.updateRecord()
      }).catch(err => {
      let message = err.response.data.join(',')
      alert('Error adding  your record, Please add a different one', message)
          })
        }
      ,
      recordDeleted(record){
        this.$record_api.deleteRecord(record).then ( () =>{
          this.updateRecord()
        })
      },
      updateRecord(){
        this.$record_api.getAllRecords().then( records =>{
          this.records = records
        })
      }
    }
  
      }
    
</script>

<style>


</style>
