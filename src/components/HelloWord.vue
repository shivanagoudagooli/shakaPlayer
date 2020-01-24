<template>
  <div>
      <div>
          <img src="../assets/play-button.png" id="img" v-on:click="play">
      </div>
        <video id="video" class="video"
           width="640px"
           poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
           controls
           ></video>
  </div>

</template>

<script>
import * as func from '../businessLogic/dashPlayer';

export default{
created(){
},
mounted(){
},
methods:{
    play(){
        // this.$router.push('justPage');
        func.initPlayer;
    }
}
}

</script>

<style>
#img{
    top:22%;
    position:absolute;
    margin-inline-start: 279px;
}
.video{
    opacity:1;
}

</style>