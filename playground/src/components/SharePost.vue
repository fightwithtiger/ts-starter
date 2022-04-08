<template>
  <div id="container" class="container"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useCanvas } from '../../../src/index'

const { canvas, ctx } = useCanvas()

onMounted(() => {
  canvas.width = 1000
  canvas.height = 900
  document.getElementById('container')?.appendChild(canvas)
  const p1 = {
    x: 10,
    y: 10,
  }
  const p2 = {
    x: 100,
    y: 200,
  }
  const p3 = {
    x: 500,
    y: 300,
  }
  const r = {
    x: 100,
    y: 200,
    width: 200,
    height: 160,
  }
  const r2 = {
    x: 200,
    y: 100,
    width: 400,
    height: 160,
  }
  ctx.drawLines([p1, p2, p3])
  ctx.drawFillRect(r, {
    fillStyle: '#c1c1c1',
  })
  ctx.drawStrokeRect(r2, {
    strokeStyle: '#555555',
  })
})
</script>

<style>
.container {
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
}
</style>
