<template>
  <div class="home">
    <Layout>
      <div class="home__page-center" slot="center">
        <p>yanjie</p>
        <p>Vue + ts 实践业务组件库</p>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from '../components/Layout.vue';

@Component({
  components: {
    Layout,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  iframe {
    width: 100%;
    height: 100%;
  }
  &__page-center {
    padding: 15px 40px;
    p {
      margin-top: 20px;
      font-size: 30px;
      &:last-child {
        font-size: 14px;
      }
    }
  }
}
</style>
