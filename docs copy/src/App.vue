<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <router-view />
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
</style>
