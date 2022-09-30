<script>
import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'

export default defineComponent({
  render() {
    return <NButton>{{ default: () => 'Star Kirby' }} CX </NButton>
  },
})
</script>

<style></style>
