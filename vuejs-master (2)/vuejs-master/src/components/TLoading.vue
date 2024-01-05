<template>
  <div class="loading">
    <div class="loading-dot loading-dot-1" />
    <div class="loading-dot loading-dot-2" />
    <div class="loading-dot loading-dot-3" />
    <div class="loading-dot loading-dot-4" />
    <div class="loading-dot loading-dot-5" />
    <div class="loading-dot loading-dot-6" />
  </div>
</template>

<style scoped>
.loading {
  width: 2.5em;
  height: 2.5em;
  position: relative;
  animation: loading 2.5s infinite linear both;
}

.loading-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: loading-dot 2.0s infinite ease-in-out both;
}

.loading-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: currentColor;
  border-radius: 100%;
  animation: loading-dot-before 2.0s infinite ease-in-out both;
}

.loading-dot-1 { animation-delay: -1.1s; }
.loading-dot-2 { animation-delay: -1.0s; }
.loading-dot-3 { animation-delay: -0.9s; }
.loading-dot-4 { animation-delay: -0.8s; }
.loading-dot-5 { animation-delay: -0.7s; }
.loading-dot-6 { animation-delay: -0.6s; }
.loading-dot-1:before { animation-delay: -1.1s; }
.loading-dot-2:before { animation-delay: -1.0s; }
.loading-dot-3:before { animation-delay: -0.9s; }
.loading-dot-4:before { animation-delay: -0.8s; }
.loading-dot-5:before { animation-delay: -0.7s; }
.loading-dot-6:before { animation-delay: -0.6s; }

@keyframes loading {
  100% { transform: rotate(360deg); }
}

@keyframes loading-dot {
  80%, 100% { transform: rotate(360deg); }
}

@keyframes loading-dot-before {
  50% {
    transform: scale(0.4);
  } 100%, 0% {
    transform: scale(1.0);
  }
}
</style>
