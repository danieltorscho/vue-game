(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f4e418b"],{"337d":function(t,e,s){},b870:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page"},[t._e(),s("div",{staticClass:"stage",class:t.stage},[s("div",{staticClass:"hitbox",style:"transform: scale(0.8) translateX("+t.player.position.x+"px)"},[s("div",{staticClass:"character",class:t.state})])])])},a=[],n=(s("d3b7"),s("ddb0"),{name:"Subzero",keys:{},data:function(){return{stage:"deadpool",state:"idle",player:{movement:{steps:4},position:{x:0}}}},methods:{keydown:function(t){this.$options.keys[t.keyCode]=!0},keyup:function(t){this.$options.keys[t.keyCode]=!1},onWalkLeftPressed:function(){"walkLeft"!==this.state&&(this.state="walkLeft"),this.player.position.x-=this.player.movement.steps},onWalkRightPressed:function(){"walkRight"!==this.state&&(this.state="walkRight"),this.player.position.x+=this.player.movement.steps},onWalkLeftReleased:function(){"walkLeft"===this.state&&(this.state="idle")},onWalkRightReleased:function(){"walkRight"===this.state&&(this.state="idle")},customKeysChecker:function(){var t=this.$options.keys,e=void 0===t?{}:t;e[37]?this.onWalkLeftPressed():this.onWalkLeftReleased(),e[39]?this.onWalkRightPressed():this.onWalkRightReleased()}},created:function(){window.addEventListener("keyup",this.keyup),window.addEventListener("keydown",this.keydown),setInterval(this.customKeysChecker,20)}}),o=n,l=(s("c24a"),s("2877")),d=Object(l["a"])(o,i,a,!1,null,"4158feea",null);e["default"]=d.exports},c24a:function(t,e,s){"use strict";s("337d")}}]);
//# sourceMappingURL=chunk-4f4e418b.9107df47.js.map