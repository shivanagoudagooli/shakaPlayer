<template>
 <div>
    <div>
        <div v-bind:class="[display ? 'img': 'eimg']">
        <img v-show="display1" src="../assets/play-button.png" class="video" @click="playVd()" >
        <img v-if="!display1" src="../assets/pause.png" class="video" @click="playVd()">
        <img src="../assets/rewind.png" class="rewind" @click="rewind()" >
        <img src="../assets/fast-forward.png" class="forward" @click="forward()">
      </div>
        <img v-show="display" src="../assets/expand.png" class="expand" @click="expand()">
        <img v-if="!display"  src="../assets/shrink.png" class="shrink" @click="makeSmall()">
      <div style="margin-left:25px;">
      <video id="video" muted="muted" width="664px" style=margin-left:35px;margin-top:0px;>
      </video><br>
      <input id="seekslider" type="range" min="0" max="100" value="0" step="1"  @click="initializsPlayer()" :class="[display ? 'seekbar':'seekbar1']">
      </div>
    </div>
  </div>
</template>
<script>
import * as func from '../businessLogic/dashPlayer';

export default {   
  data () {
    return{
     display:true,
     display1:true,
     display2:true
    }
  },
  created(){
  },
  methods:{
      
      playVd(){
        let myVideo = document.getElementById("video");
        console.log(myVideo);
        if(func.initPlayer){
            
           this.display1 = false;
          myVideo.play();
        }
        else{
          myVideo.pause();
          this.display1 = true;
        }
      },
      expand(){
        this.display =false
        let myVideo = document.getElementById("video");
        myVideo.width = 1200;
      },
      makeSmall(){
        let myVideo = document.getElementById("video");
        this.display = true;
        myVideo.width = 664;
      },
    
      initializsPlayer(){
        let seekslider = document.getElementById("seekslider");
      let vid = document.getElementById("video");
        seekslider.addEventListener("change",this.vidseek(),false)
        vid.addEventListener("timeupdate",this.seektimeupdate(),false)
      },
      vidseek(){
        let seekslider = document.getElementById("seekslider");
        let vid = document.getElementById("video");
        let seekto = vid.duration * (seekslider.value/100);
      
        vid.currentTime =seekto;
        console.log(seekto,"end")
      },
      seektimeupdate(){
        var seekslider = document.getElementById("seekslider");
        var vid = document.getElementById("video");
  
        let seekto = vid.duration * (seekslider.value/100);
        vid.currentTime =seekto;

        var nt = vid.currentTime * (100 / vid.duration);
        seekslider.value = nt;
      },
      rewind(){
          console.log("rewind")
          let seekslider = document.getElementById("seekslider");
        let vid = document.getElementById("video");
        let time = vid.duration * (seekslider.value/100);
        vid.currentTime =time;
        
        let nt = vid.currentTime * (100/vid.duration);
        seekslider.value= nt-10;
        console.log("rewind end")
      },
      forward(){
          console.log("forward")
          let seekslider = document.getElementById("seekslider");
        let vid = document.getElementById("video");
        let time = vid.duration * (seekslider.value/100);
        vid.currentTime =time;
        
        let nt = vid.currentTime * (100/vid.duration);
        seekslider.value= nt+10;
      }
        
     
    
  }
}
</script>

<style  scoped>
.video{
  position:absolute;
  margin-inline-start: 289px;
  z-index: 1;
}
.img{
  top:23%;
  padding-left: 50px;
  margin-left: 25px;
  position:absolute;
  
}
.eimg{
    text-align: center;
    top:51%;
    padding-left: 322px;
    position: absolute;
}
.expand{
    top:45%;
  position:absolute;
  margin-left: 673px;
  z-index: 1;
  
}
.shrink{
    padding-top: 44%;
    position: absolute;
    z-index: 1;
    padding-left: 86%;

}
.seekbar{
  width: 686px;
}
.seekbar1{
  width:1237px;
}
.rewind{
  position:absolute;
  margin-left: 143px;
  z-index: 1;
}
.forward{
  position:absolute;
  margin-left: 433px;
  z-index: 1; 
}

</style>
