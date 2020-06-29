<template>
  <div class="home">
    <Layout>
      <component :is="current" slot="center" />
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Layout from '../components/Layout.vue';
import { markdown } from '../constant';

@Component({
  components: {
    Layout,
    ...markdown,
  },
})
export default class Home extends Vue {
  current = ''

  @Watch('$route.path')
  onPathChange(val: string) {
    this.pathChange(val.substring(1));
  }

  created() {
    this.pathChange();
  }

  pathChange(name: string = this.$route.path.substring(1)) {
    this.current = name[0].toUpperCase() + name.substring(1);
    console.log(this.current);
  }
}
</script>

<style lang="stylus">
.home
  iframe
    width 100%
    height 100%
</style>
