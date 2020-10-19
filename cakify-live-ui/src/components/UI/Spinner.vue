<template functional>
  <svg :class="'spinner' + (props.centered ? ' centered' : '')" xmlns="http://www.w3.org/2000/svg" :width="props.size || 45" :height="props.size || 45" viewBox="0 0 45 45" :stroke="props.color || '#f67878'">
    <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
        <circle cx="22" cy="22" r="15.7778" stroke-opacity="0">
            <animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"/>
            <animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"/>
        </circle>
        <circle cx="22" cy="22" r="7.77779" stroke-opacity="0">
            <animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"/>
            <animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"/>
        </circle>
        <circle cx="22" cy="22" r="1.33334">
            <animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite"/>
        </circle>
    </g>{{data}}
  </svg>
</template>

<style lang="scss">
.spinner {
  padding: 0 !important;
}
.spinner.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>